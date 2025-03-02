using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<Answer> CreateAnswerAsync(Answer answerModel)
        {
            await _context.Answers.AddAsync(answerModel);
            await _context.SaveChangesAsync();
            return answerModel;
        }

        public async Task<Answer?> DeleteAnswerAsync(int id)
        {
            var existingAnswer = await _context.Answers.FirstOrDefaultAsync(a => a.Id == id);

            if (existingAnswer == null) return null;

            var resultAnswers = await _context.ResultAnswers
                .Where(a => a.AnswerId == id)
                .ToListAsync();

            if (resultAnswers.Any())
            {
                _context.ResultAnswers.RemoveRange(resultAnswers);
            }

            _context.Remove(existingAnswer);
            await _context.SaveChangesAsync();

            return existingAnswer;
        }

        public async Task<Answer?> GetAnswerByIdAsync(int id)
        {
            return await _context.Answers.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<List<Answer>> GetAnswersByQuestionIdAsync(int questionId)
        {
            return await _context.Answers.Where(a => a.QuestionId == questionId).ToListAsync();
        }

        public async Task<Answer?> UpdateAnswerAsync(int id, Answer answerModel)
        {
            var existingAnswer = await _context.Answers.FirstOrDefaultAsync(a => a.Id == id);

            if (existingAnswer == null) return null;

            existingAnswer.Text = answerModel.Text;
            existingAnswer.IsCorrect = answerModel.IsCorrect;

            await _context.SaveChangesAsync();

            return existingAnswer;
        }
    }
}