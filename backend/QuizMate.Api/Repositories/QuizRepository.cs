using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
using QuizMate.Api.DTOs.Quiz;
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


        public async Task<IEnumerable<Quiz>> GetAllQuizzesAsync(QuizQueryObject queryObject)
        {
            var query = _context.Quizzes
                .Include(q => q.Category)
                .Include(q => q.AppUser)
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .AsQueryable();

            // Filter by search
            if (!string.IsNullOrEmpty(queryObject.Search))
            {
                query = query.Where(q => q.Title.Contains(queryObject.Search) || q.Description.Contains(queryObject.Search));
            }

            // Filter by category
            if (!string.IsNullOrEmpty(queryObject.CategorySlug))
            {
                query = query.Where(q => q.Category.Slug == queryObject.CategorySlug);
            }

            // Filter by difficulty
            if (!string.IsNullOrEmpty(queryObject.Difficulty))
            {
                query = query.Where(q => q.Difficulty == queryObject.Difficulty);
            }

            // Filter by duration
            if (queryObject.Duration != null)
            {
                query = query.Where(q => q.TimeMinutes <= queryObject.Duration);
            }

            // Filter by public/private
            if (queryObject.IsPublic != null)
            {
                query = query.Where(q => q.IsPublic == queryObject.IsPublic);
            }

            // Sorting
            switch (queryObject.SortBy?.ToLower())
            {
                case "title":
                    query = queryObject.IsDescending
                        ? query.OrderByDescending(q => q.Title)
                        : query.OrderBy(q => q.Title);
                    break;
                case "createdAt":
                    query = queryObject.IsDescending
                        ? query.OrderByDescending(q => q.CreatedAt)
                        : query.OrderBy(q => q.CreatedAt);
                    break;
                case "rating":
                    query = queryObject.IsDescending
                        ? query.OrderByDescending(q => q.Rating)
                        : query.OrderBy(q => q.Rating);
                    break;
                case "completions":
                    query = queryObject.IsDescending
                        ? query.OrderByDescending(q => q.Completions)
                        : query.OrderBy(q => q.Completions);
                    break;
                case "questionCount":
                    query = queryObject.IsDescending
                        ? query.OrderByDescending(q => q.QuestionCount)
                        : query.OrderBy(q => q.QuestionCount);
                    break;
                case "difficulty":
                    query = queryObject.IsDescending
                        ? query.OrderByDescending(q => q.Difficulty)
                        : query.OrderBy(q => q.Difficulty);
                    break;
                default:
                    // Default ordering
                    query = queryObject.IsDescending
                        ? query.OrderByDescending(q => q.CreatedAt)
                        : query.OrderBy(q => q.CreatedAt);
                    break;
            }

            // Pagination   
            return await query.Skip((queryObject.Page - 1) * queryObject.PageSize).Take(queryObject.PageSize).ToListAsync();
        }

        public async Task<Quiz?> GetQuizByIdAsync(string id)
        {
            return await _context.Quizzes
            .Include(q => q.Category)
            .Include(q => q.AppUser)
            .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<Quiz?> GetQuizBySlugAsync(string slug)
        {
            return await _context.Quizzes
                .Include(q => q.Category)
                .Include(q => q.AppUser)
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Slug == slug);
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByCategorySlugAsync(string slug)
        {
            return await _context.Quizzes
                .Include(q => q.Category)
                .Include(q => q.AppUser)
                .Include(q => q.Questions)
                .Where(q => q.Category.Slug == slug)
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