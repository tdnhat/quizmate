using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
using QuizMate.Api.Helpers;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        private readonly ApplicationDbContext _context;
        public QuizRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Quiz?> CreateQuizAsync(Quiz quiz)
        {
            quiz.Slug = await GenerateUniqueSlugAsync(quiz.Title);
            await _context.Quizzes.AddAsync(quiz);
            await _context.SaveChangesAsync();
            return quiz;
        }

        public async Task<bool> DeleteQuizAsync(string id)
        {
            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null)
            {
                return false;
            }
            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> GenerateUniqueSlugAsync(string title)
        {
            var slug = SlugHelper.GenerateSlug(title);
            var existingQuiz = await _context.Quizzes.FirstOrDefaultAsync(q => q.Slug == slug);
            if (existingQuiz == null)
            {
                return slug;
            }
            return await GenerateUniqueSlugAsync(title + "-" + Guid.NewGuid().ToString("N").Substring(0, 4)); // Example: "quiz-1234"
        }


        public async Task<IEnumerable<Quiz>> GetAllQuizzesAsync()
        {
            return await _context.Quizzes
                .Include(q => q.Category)
                .Include(q => q.AppUser)
                .Include(q => q.Questions)
                .ToListAsync();
        }

        public async Task<Quiz?> GetQuizByIdAsync(string id)
        {
            return await _context.Quizzes
            .Include(q => q.Category)
            .Include(q => q.AppUser)
            .Include(q => q.Questions)
            .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<IEnumerable<Quiz>> GetQuizBySlugAsync(string slug)
        {
            return await _context.Quizzes
                .Include(q => q.Category)
                .Include(q => q.AppUser)
                .Include(q => q.Questions)
                .Where(q => q.Slug == slug).ToListAsync();
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByCategoryIdAsync(string categoryId)
        {
            return await _context.Quizzes
                .Include(q => q.Category)
                .Include(q => q.AppUser)
                .Include(q => q.Questions)
                .Where(q => q.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByCategorySlugAsync(string categorySlug)
        {
            return await _context.Quizzes
                .Include(q => q.Category)
                .Include(q => q.AppUser)
                .Include(q => q.Questions)
                .Where(q => q.Category.Slug == categorySlug)
                .ToListAsync();
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByUserIdAsync(string userId)
        {
            return await _context.Quizzes
                .Include(q => q.Category)
                .Include(q => q.AppUser)
                .Include(q => q.Questions)
                .Where(q => q.AppUserId == userId)
                .ToListAsync();
        }

        public async Task<Quiz?> UpdateQuizAsync(string id, Quiz quiz)
        {
            var existingQuiz = await _context.Quizzes
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (existingQuiz == null)
            {
                return null;
            }

            existingQuiz.Title = quiz.Title;
            existingQuiz.Description = quiz.Description;
            existingQuiz.CategoryId = quiz.CategoryId;
            existingQuiz.Thumbnail = quiz.Thumbnail;
            existingQuiz.TimeMinutes = quiz.TimeMinutes;
            existingQuiz.PassingScore = quiz.PassingScore;
            existingQuiz.IsPublic = quiz.IsPublic;
            existingQuiz.Difficulty = quiz.Difficulty;
            existingQuiz.QuestionCount = quiz.Questions.Count;
            existingQuiz.Tags = quiz.Tags;
            existingQuiz.Slug = await GenerateUniqueSlugAsync(quiz.Title);

            var questionIdsToKeep = quiz.Questions.Select(q => q.Id).ToList();
            var questionsToRemove = existingQuiz.Questions
                .Where(q => !questionIdsToKeep.Contains(q.Id))
                .ToList();

            foreach (var questionToRemove in questionsToRemove)
            {
                existingQuiz.Questions.Remove(questionToRemove);
                _context.Questions.Remove(questionToRemove);
            }

            foreach (var updatedQuestion in quiz.Questions)
            {
                var existingQuestion = existingQuiz.Questions
                    .FirstOrDefault(q => q.Id == updatedQuestion.Id);

                if (existingQuestion == null)
                {
                    updatedQuestion.QuizId = existingQuiz.Id;
                    existingQuiz.Questions.Add(updatedQuestion);
                }
                else
                {
                    existingQuestion.Text = updatedQuestion.Text;
                    existingQuestion.QuestionType = updatedQuestion.QuestionType;
                    existingQuestion.Points = updatedQuestion.Points;
                    existingQuestion.ImageUrl = updatedQuestion.ImageUrl;
                    existingQuestion.Explanation = updatedQuestion.Explanation;

                    var answerIdsToKeep = updatedQuestion.Answers.Select(a => a.Id).ToList();
                    var answersToRemove = existingQuestion.Answers
                        .Where(a => !answerIdsToKeep.Contains(a.Id))
                        .ToList();

                    foreach (var answerToRemove in answersToRemove)
                    {
                        existingQuestion.Answers.Remove(answerToRemove);
                        _context.Answers.Remove(answerToRemove);
                    }

                    foreach (var updatedAnswer in updatedQuestion.Answers)
                    {
                        var existingAnswer = existingQuestion.Answers
                            .FirstOrDefault(a => a.Id == updatedAnswer.Id);

                        if (existingAnswer == null)
                        {
                            updatedAnswer.QuestionId = existingQuestion.Id;
                            existingQuestion.Answers.Add(updatedAnswer);
                        }
                        else
                        {
                            existingAnswer.Text = updatedAnswer.Text;
                            existingAnswer.IsCorrect = updatedAnswer.IsCorrect;
                            existingAnswer.Explanation = updatedAnswer.Explanation;
                        }
                    }
                }
            }

            await _context.SaveChangesAsync();
            return existingQuiz;
        }
    }
}