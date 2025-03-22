using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly ApplicationDbContext _context;

        public QuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Question?> CreateQuestionAsync(Question question)
        {
            await _context.Questions.AddAsync(question);
            await _context.SaveChangesAsync();
            return question;
        }

        public async Task<bool> DeleteQuestionAsync(string id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return false;
            }
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Question?> GetQuestionByIdAsync(string id)
        {
            return await _context.Questions.FindAsync(id);
        }

        public async Task<IEnumerable<Question>> GetQuestionsByQuizIdAsync(string quizId)
        {
            return await _context.Questions.Where(q => q.QuizId == quizId).ToListAsync();
        }

        public async Task<Question?> UpdateQuestionAsync(string id, Question question)
        {
            _context.Questions.Update(question);
            await _context.SaveChangesAsync();
            return question;
        }

    }
}