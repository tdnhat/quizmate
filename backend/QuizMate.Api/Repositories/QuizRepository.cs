using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
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
        public async Task<IEnumerable<Quiz>> GetAllQuizzesAsync()
        {
            return await _context.Quizzes.ToListAsync();
        }

        public async Task<Quiz?> GetQuizByIdAsync(string id)
        {
            return await _context.Quizzes.FindAsync(id);
        }

        public async Task<IEnumerable<Quiz>> GetQuizBySlugAsync(string slug)
        {
            return await _context.Quizzes.Where(q => q.Slug == slug).ToListAsync();
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByCategoryIdAsync(string categoryId)
        {
            return await _context.Quizzes.Where(q => q.CategoryId == categoryId).ToListAsync();
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByCategorySlugAsync(string categorySlug)
        {
            return await _context.Quizzes.Where(q => q.Category.Slug == categorySlug).ToListAsync();
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByUserIdAsync(string userId)
        {
            return await _context.Quizzes.Where(q => q.AppUserId == userId).ToListAsync();
        }

        public async Task<Quiz?> UpdateQuizAsync(string id, Quiz quiz)
        {
            _context.Quizzes.Update(quiz);
            await _context.SaveChangesAsync();
            return quiz;
        }
    }
}