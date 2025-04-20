using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Repositories
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly ApplicationDbContext _context;

        public AnswerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Answer?> CreateAnswerAsync(Answer answer)
        {
            await _context.Answers.AddAsync(answer);
            await _context.SaveChangesAsync();
            return answer;
        }

        public async Task<bool> DeleteAnswerAsync(string id)
        {
            var answer = await _context.Answers.FindAsync(id);
            if (answer == null)
            {
                return false;
            }
            _context.Answers.Remove(answer);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Answer?> GetAnswerByIdAsync(string id)
        {
            return await _context.Answers.FindAsync(id);
        }

        public async Task<IEnumerable<Answer>> GetAnswersByQuestionIdAsync(string questionId)
        {
            return await _context.Answers.Where(a => a.QuestionId == questionId).ToListAsync();
        }

        public async Task<Answer?> UpdateAnswerAsync(string id, Answer answer)
        {
            _context.Answers.Update(answer);
            await _context.SaveChangesAsync();
            return answer;
        }

    }
}