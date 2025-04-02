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
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!string.IsNullOrEmpty(userId))
            {
                await _unitOfWork.QuizSessionRepository.UpdateParticipantConnectionStatusAsync(userId, Context.ConnectionId, false);
                await _unitOfWork.SaveAsync();

                var participant = await _unitOfWork.QuizSessionRepository.GetParticipantByConnectionIdAsync(Context.ConnectionId);
                if (participant != null)
                {
                    await Clients.Group(participant.QuizSessionId).SendAsync("ParticipantLeft", new
                    {
                        userId = participant.UserId,
                        username = participant.User.UserName
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
                Console.WriteLine($"User email: {userEmail}");
                
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

                await Clients.Group(sessionId).SendAsync("ParticipantJoined", new
                {
                    userId = user.Id,
                    username = user.UserName,
                    score = participant.Score
                });
                Console.WriteLine("ParticipantJoined event sent");

                // Send current session state to the joining user
                if (session.Status == "Active" && session.CurrentQuestionIndex >= 0 && session.Quiz != null)
                {
                    var currentQuestion = session.Quiz.Questions.ElementAtOrDefault(session.CurrentQuestionIndex);
                    if (currentQuestion != null)
                    {
                        Console.WriteLine($"Sending current question: {currentQuestion.Text}");
                        await Clients.Caller.SendAsync("CurrentQuestion", new
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

            await Clients.Group(sessionId).SendAsync("SessionStarted");
        }

        public async Task NextQuestion(string sessionId)
        {
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

            session.CurrentQuestionIndex++;

            if (session.CurrentQuestionIndex >= session.Quiz.Questions.Count)
            {
                // End of quiz
                session.Status = "Completed";
                session.EndedAt = DateTime.UtcNow;
                await _unitOfWork.SaveAsync();

                var results = await _unitOfWork.QuizSessionRepository.GetSessionResultsAsync(sessionId);
                await Clients.Group(sessionId).SendAsync("QuizEnded", results);
                return;
            }

            await _unitOfWork.SaveAsync();

            var question = session.Quiz.Questions.ElementAt(session.CurrentQuestionIndex);

            await Clients.Group(sessionId).SendAsync("NewQuestion", new
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

        public async Task SubmitAnswer(string sessionId, string questionId, string answerId)
        {
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

            // Record the answer
            await _unitOfWork.QuizSessionRepository.RecordAnswerAsync(
                sessionId, participant.Id, questionId, answerId, answer.IsCorrect,
                answer.IsCorrect ? currentQuestion.Points : 0);

            if (answer.IsCorrect)
            {
                participant.Score += currentQuestion.Points;
                await _unitOfWork.SaveAsync();
            }

            // Notify only the participant about their answer result
            await Clients.Caller.SendAsync("AnswerResult", new
            {
                isCorrect = answer.IsCorrect,
                points = answer.IsCorrect ? currentQuestion.Points : 0,
                newScore = participant.Score
            });

            // Notify everyone about updated scores
            await Clients.Group(sessionId).SendAsync("ScoreUpdate", new
            {
                userId = participant.UserId,
                score = participant.Score
            });
        }

        public async Task EndSession(string sessionId)
        {
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

            var results = await _unitOfWork.QuizSessionRepository.GetSessionResultsAsync(sessionId);
            await Clients.Group(sessionId).SendAsync("QuizEnded", results);
        }
    }
}