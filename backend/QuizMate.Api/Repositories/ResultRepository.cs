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
        public async Task<ResultAnswer?> CreateResultAnswerAsync(ResultAnswer resultAnswer)
        {
            await _context.ResultAnswers.AddAsync(resultAnswer);
            await _context.SaveChangesAsync();
            return resultAnswer;
        }

        public async Task<Result?> CreateResultAsync(Result result)
        {
            await _context.Results.AddAsync(result);
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<bool> DeleteResultAsync(string id)
        {
            var result = await _context.Results.FindAsync(id);
            if (result == null)
            {
                return false;
            }
            _context.Results.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Result?> GetResultByIdAsync(string id)
        {
            return await _context.Results.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<Result>> GetResultsByQuizIdAsync(string quizId)
        {
            return await _context.Results.Where(r => r.QuizId == quizId).ToListAsync();
        }

        public async Task<IEnumerable<Result>> GetResultsByUserIdAsync(string userId)
        {
            return await _context.Results.Where(r => r.AppUserId == userId).ToListAsync();
        }

        public async Task<Result?> UpdateResultAsync(string id, Result result)
        {
            _context.Results.Update(result);
            await _context.SaveChangesAsync();
            return result;
        }

    }
}