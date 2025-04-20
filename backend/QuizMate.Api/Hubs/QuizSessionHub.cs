using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using QuizMate.Api.Extensions;

namespace QuizMate.Api.Hubs
{
    [Authorize]
    public class QuizSessionHub : Hub
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public QuizSessionHub(IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Client connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!string.IsNullOrEmpty(userId))
            {
                await _unitOfWork.QuizSessionRepository.UpdateParticipantConnectionStatusAsync(userId, Context.ConnectionId, false);
                await _unitOfWork.SaveAsync();

                var participant = await _unitOfWork.QuizSessionRepository.GetParticipantByConnectionIdAsync(Context.ConnectionId);
                if (participant != null)
                {
                    await Clients.Group(participant.QuizSessionId).SendAsync("participantLeft", new
                    {
                        userId = participant.UserId,
                        username = participant.User.UserName,
                        leftAt = participant.LeftAt,
                    });
                }
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinSession(string sessionId)
        {
            try
            {
                var userEmail = Context.User.GetEmail();
                Console.WriteLine($"User email: {userEmail} attempting to join session: {sessionId}");

                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                {
                    Console.WriteLine("User not found");
                    throw new HubException("User not found");
                }

                var session = await _unitOfWork.QuizSessionRepository.GetSessionByIdAsync(sessionId);
                if (session == null)
                {
                    Console.WriteLine($"Session not found: {sessionId}");
                    throw new HubException("Session not found");
                }

                Console.WriteLine($"Session found: {sessionId}, Status: {session.Status}, Quiz null: {session.Quiz == null}");

                if (session.Status != "Waiting" && session.Status != "Active")
                {
                    Console.WriteLine($"Cannot join session with status: {session.Status}");
                    throw new HubException("Cannot join this session");
                }

                await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
                Console.WriteLine($"Added to group: {sessionId}");

                var participant = await _unitOfWork.QuizSessionRepository.AddOrUpdateParticipantAsync(
                    sessionId, user.Id, Context.ConnectionId);

                await _unitOfWork.SaveAsync();
                Console.WriteLine($"Participant added: {participant.Id}");

                await Clients.Group(sessionId).SendAsync("participantJoined", new
                {
                    userId = user.Id,
                    username = user.UserName,
                    score = participant.Score,
                    isActive = participant.IsActive,
                    joinedAt = participant.JoinedAt,
                });
                Console.WriteLine("participantJoined event sent");

                // Send current session state to the joining user
                if (session.Status == "Active" && session.CurrentQuestionIndex >= 0 && session.Quiz != null)
                {
                    var currentQuestion = session.Quiz.Questions.ElementAtOrDefault(session.CurrentQuestionIndex);
                    if (currentQuestion != null)
                    {
                        Console.WriteLine($"Sending current question: {currentQuestion.Text}");
                        await Clients.Caller.SendAsync("currentQuestion", new
                        {
                            questionIndex = session.CurrentQuestionIndex,
                            questionId = currentQuestion.Id,
                            text = currentQuestion.Text,
                            questionType = currentQuestion.QuestionType,
                            imageUrl = currentQuestion.ImageUrl,
                            answers = currentQuestion.Answers.Select(a => new
                            {
                                id = a.Id,
                                text = a.Text
                            })
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in JoinSession: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                throw new HubException($"Error joining session: {ex.Message}");
            }
        }

        public async Task StartSession(string sessionId)
        {
            try
            {
                Console.WriteLine($"Starting session: {sessionId}");
                var userEmail = Context.User.GetEmail();
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                    throw new HubException("User not found");

                var session = await _unitOfWork.QuizSessionRepository.GetSessionByIdAsync(sessionId);
                if (session == null)
                    throw new HubException("Session not found");

                if (session.HostId != user.Id)
                    throw new HubException("Only the host can start the session");

                if (session.Status != "Waiting")
                    throw new HubException("Session already started");

                session.Status = "Active";
                session.StartedAt = DateTime.UtcNow;
                await _unitOfWork.SaveAsync();

                Console.WriteLine($"Session {sessionId} started successfully");
                
                // Send session state update
                await Clients.Group(sessionId).SendAsync("sessionStateChanged", "Active", session.Quiz.Title);
                await Clients.Group(sessionId).SendAsync("sessionStarted");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in StartSession: {ex.Message}");
                throw new HubException($"Error starting session: {ex.Message}");
            }
        }

        public async Task NextQuestion(string sessionId)
        {
            try
            {
                Console.WriteLine($"Moving to next question for session: {sessionId}");
                var userEmail = Context.User.GetEmail();
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                    throw new HubException("User not found");

                var session = await _unitOfWork.QuizSessionRepository.GetSessionByIdAsync(sessionId);
                if (session == null)
                    throw new HubException("Session not found");

                if (session.HostId != user.Id)
                    throw new HubException("Only the host can control questions");

                if (session.Status != "Active")
                    throw new HubException("Session is not active");
                
                // If this isn't the first question, notify that the previous question is completed
                if (session.CurrentQuestionIndex >= 0)
                {
                    await Clients.Group(sessionId).SendAsync("questionCompleted");
                    // Signal that we're between questions
                    await Clients.Group(sessionId).SendAsync("sessionStateChanged", "BetweenQuestions", session.Quiz.Title);
                }

                session.CurrentQuestionIndex++;

                if (session.CurrentQuestionIndex >= session.Quiz.Questions.Count)
                {
                    // End of quiz
                    Console.WriteLine($"No more questions, ending session: {sessionId}");
                    session.Status = "Completed";
                    session.EndedAt = DateTime.UtcNow;
                    await _unitOfWork.SaveAsync();

                    // Signal the session is showing results
                    await Clients.Group(sessionId).SendAsync("sessionStateChanged", "ShowingResults", session.Quiz.Title);
                    await Clients.Group(sessionId).SendAsync("showingResults");

                    var results = await _unitOfWork.QuizSessionRepository.GetSessionResultsAsync(sessionId);
                    await Clients.Group(sessionId).SendAsync("quizEnded", results);
                    return;
                }

                await _unitOfWork.SaveAsync();

                var question = session.Quiz.Questions.ElementAt(session.CurrentQuestionIndex);
                Console.WriteLine($"Sending question {session.CurrentQuestionIndex}: {question.Text}");
                
                // Signal that we're now in the Active state with a new question
                await Clients.Group(sessionId).SendAsync("sessionStateChanged", "Active", session.Quiz.Title);

                await Clients.Group(sessionId).SendAsync("newQuestion", new
                {
                    questionIndex = session.CurrentQuestionIndex,
                    questionId = question.Id,
                    text = question.Text,
                    questionType = question.QuestionType,
                    imageUrl = question.ImageUrl,
                    answers = question.Answers.Select(a => new
                    {
                        id = a.Id,
                        text = a.Text
                    })
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in NextQuestion: {ex.Message}");
                throw new HubException($"Error moving to next question: {ex.Message}");
            }
        }

        public async Task SubmitAnswer(string sessionId, string questionId, string answerId, int? timeTaken = null)
        {
            try
            {
                Console.WriteLine($"User submitting answer in session: {sessionId}, question: {questionId}, answer: {answerId}, time taken: {timeTaken ?? 0}s");
                var userEmail = Context.User.GetEmail();
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                    throw new HubException("User not found");

                var session = await _unitOfWork.QuizSessionRepository.GetSessionByIdAsync(sessionId);
                if (session == null)
                    throw new HubException("Session not found");

                if (session.Status != "Active")
                    throw new HubException("Session is not active");

                var participant = await _unitOfWork.QuizSessionRepository.GetParticipantAsync(sessionId, user.Id);
                if (participant == null)
                    throw new HubException("Not a participant in this session");

                var currentQuestion = session.Quiz.Questions.ElementAtOrDefault(session.CurrentQuestionIndex);
                if (currentQuestion == null || currentQuestion.Id != questionId)
                    throw new HubException("Invalid question");

                var answer = currentQuestion.Answers.FirstOrDefault(a => a.Id == answerId);
                if (answer == null)
                    throw new HubException("Invalid answer");

                // Calculate time-based bonus points (if answer is correct)
                int timeBonus = 0;
                if (answer.IsCorrect && timeTaken.HasValue)
                {
                    // Get time limit from the session
                    int timeLimit = 30; // Default time limit in seconds
                    
                    // Ensure time taken is within the time limit
                    int validTimeTaken = Math.Min(timeTaken.Value, timeLimit);
                    
                    // Calculate bonus: more points for faster answers
                    // Start with 50% bonus for immediate answers, scaling down to 0% at the time limit
                    double percentageOfTimeUsed = (double)validTimeTaken / timeLimit;
                    double bonusPercentage = Math.Max(0, 0.5 - (0.5 * percentageOfTimeUsed));
                    timeBonus = (int)Math.Round(currentQuestion.Points * bonusPercentage);
                    
                    Console.WriteLine($"Time bonus calculated: {timeBonus} points (answered in {validTimeTaken}s out of {timeLimit}s)");
                }
                
                // Total points including time bonus
                int totalPoints = answer.IsCorrect ? (currentQuestion.Points + timeBonus) : 0;

                // Record the answer - use the existing method signature with 6 parameters
                await _unitOfWork.QuizSessionRepository.RecordAnswerAsync(
                    sessionId, participant.Id, questionId, answerId, answer.IsCorrect,
                    totalPoints, timeTaken ?? 0);

                if (answer.IsCorrect)
                {
                    participant.Score += totalPoints;
                    await _unitOfWork.SaveAsync();
                }

                Console.WriteLine($"Answer processed. Correct: {answer.IsCorrect}, Base Points: {(answer.IsCorrect ? currentQuestion.Points : 0)}, Time Bonus: {timeBonus}, Total: {totalPoints}");

                // Notify only the participant about their answer result
                await Clients.Caller.SendAsync("answerResult", new
                {
                    isCorrect = answer.IsCorrect,
                    points = totalPoints,
                    basePoints = answer.IsCorrect ? currentQuestion.Points : 0,
                    timeBonus = timeBonus,
                    timeTaken = timeTaken,
                    newScore = participant.Score
                });

                // Broadcast score update to all connected clients
                await Clients.Group(sessionId).SendAsync("scoreUpdate", new
                {
                    userId = user.Id,
                    score = participant.Score,
                    lastPoints = totalPoints,
                    timeTaken = timeTaken
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SubmitAnswer: {ex.Message}");
                throw new HubException($"Error submitting answer: {ex.Message}");
            }
        }

        public async Task EndSession(string sessionId)
        {
            try
            {
                Console.WriteLine($"Ending session: {sessionId}");
                var userEmail = Context.User.GetEmail();
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                    throw new HubException("User not found");

                var session = await _unitOfWork.QuizSessionRepository.GetSessionByIdAsync(sessionId);
                if (session == null)
                    throw new HubException("Session not found");

                if (session.HostId != user.Id)
                    throw new HubException("Only the host can end the session");

                if (session.Status == "Completed")
                    throw new HubException("Session already completed");

                session.Status = "Completed";
                session.EndedAt = DateTime.UtcNow;
                await _unitOfWork.SaveAsync();

                // Signal the session state change
                await Clients.Group(sessionId).SendAsync("sessionStateChanged", "Ended", session.Quiz.Title);
                
                // Show results before ending
                await Clients.Group(sessionId).SendAsync("showingResults");

                var results = await _unitOfWork.QuizSessionRepository.GetSessionResultsAsync(sessionId);
                await Clients.Group(sessionId).SendAsync("quizEnded", results);
                Console.WriteLine($"Session {sessionId} ended successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in EndSession: {ex.Message}");
                throw new HubException($"Error ending session: {ex.Message}");
            }
        }
    }
}