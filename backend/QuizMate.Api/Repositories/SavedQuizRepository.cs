using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Repositories
{
    public class SavedQuizRepository : ISavedQuizRepository
    {
        private readonly ApplicationDbContext _context;

        public SavedQuizRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsSavedByUserAsync(string quizId, string userId)
        {
            return await _context.SavedQuizzes
                .AnyAsync(sq => sq.QuizId == quizId && sq.AppUserId == userId);
        }

        public async Task<bool> ToggleSaveQuizAsync(string quizId, string userId)
        {
            var existingSave = await _context.SavedQuizzes
                .FirstOrDefaultAsync(sq => sq.QuizId == quizId && sq.AppUserId == userId);

            if (existingSave != null)
            {
                // Unsave
                _context.SavedQuizzes.Remove(existingSave);
                await _context.SaveChangesAsync();
                return false; // Indicates the quiz is now unsaved
            }
            else
            {
                // Save
                var savedQuiz = new SavedQuiz
                {
                    QuizId = quizId,
                    AppUserId = userId
                };
                await _context.SavedQuizzes.AddAsync(savedQuiz);
                await _context.SaveChangesAsync();
                return true; // Indicates the quiz is now saved
            }
        }

        public async Task<IEnumerable<Quiz>> GetUserSavedQuizzesAsync(string userId, QuizQueryObject queryObject)
        {
            var query = _context.SavedQuizzes
                .Where(sq => sq.AppUserId == userId)
                .Include(sq => sq.Quiz)
                    .ThenInclude(q => q.Category)
                .Include(sq => sq.Quiz)
                    .ThenInclude(q => q.AppUser)
                .Select(sq => sq.Quiz)
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
    }
}