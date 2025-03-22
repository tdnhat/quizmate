using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Repositories
{
    public class ResultRepository : IResultRepository
    {
        private readonly ApplicationDbContext _context;

        public ResultRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Result>> GetAllResultsAsync()
        {
            return await _context.Results
                .Include(r => r.Quiz)
                .Include(r => r.AppUser)
                .Include(r => r.ResultAnswers)
                .ToListAsync();
        }

        public async Task<Result?> GetResultByIdAsync(string id)
        {
            return await _context.Results
                .Include(r => r.Quiz)
                .Include(r => r.AppUser)
                .Include(r => r.ResultAnswers)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<Result>> GetResultsByUserIdAsync(string userId)
        {
            return await _context.Results
                .Include(r => r.Quiz)
                .Include(r => r.AppUser)
                .Include(r => r.ResultAnswers)
                .Where(r => r.AppUserId == userId)
                .ToListAsync();
        }


        public async Task<Result> SubmitQuizAsync(Result result)
        {
            var quiz = await _context.Quizzes
        .Include(q => q.Questions)
            .ThenInclude(q => q.Answers)
        .FirstOrDefaultAsync(q => q.Id == result.QuizId);

            if (quiz == null)
            {
                throw new Exception("Quiz not found");
            }

            // Calculate the maximum possible score for the quiz
            result.MaxScore = quiz.Questions.Sum(q => q.Points);

            // Process each answer submission and calculate scores
            foreach (var resultAnswer in result.ResultAnswers)
            {
                // Find the question and selected answer
                var question = quiz.Questions.FirstOrDefault(q => q.Id == resultAnswer.QuestionId);
                var selectedAnswer = question?.Answers.FirstOrDefault(a => a.Id == resultAnswer.AnswerId);

                if (question != null && selectedAnswer != null)
                {
                    // Set the correct flag based on the selected answer
                    resultAnswer.IsCorrect = selectedAnswer.IsCorrect;

                    // Award points if the answer is correct
                    resultAnswer.EarnedPoints = selectedAnswer.IsCorrect ? question.Points : 0;

                    // Update the counters
                    if (selectedAnswer.IsCorrect)
                    {
                        result.CorrectAnswersCount++;
                    }
                    else
                    {
                        result.IncorrectAnswersCount++;
                    }
                }
            }

            // Calculate unanswered questions
            result.UnansweredCount = quiz.Questions.Count - result.ResultAnswers.Count;

            // Calculate total score
            result.Score = result.ResultAnswers.Sum(ra => ra.EarnedPoints);

            // Calculate pass rate (as a percentage)
            result.PassRate = result.MaxScore > 0
                ? (double)result.Score / result.MaxScore
                : 0;

            // Determine if the quiz is passed based on quiz's passing score
            result.IsPassed = result.Score >= quiz.PassingScore;

            // Set attempted date to now if not already set
            if (result.AttemptedAt == default)
            {
                result.AttemptedAt = DateTime.UtcNow;
            }

            // Increment the quiz's total submissions count
            quiz.Completions++;

            await _context.Results.AddAsync(result);
            await _context.SaveChangesAsync();
            return result;
        }

    }
}