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
    public class QuestionRepository : IQuestionRepository
    {
        private readonly ApplicationDbContext _context;
        public QuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Question> CreateQuestionAsync(Question questionModel)
        {
            await _context.Questions.AddAsync(questionModel);
            await _context.SaveChangesAsync();
            return questionModel;
        }

        public async Task<Question?> DeleteQuestionAsync(int id)
        {
            var existingQuestion = await _context.Questions
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (existingQuestion == null) return null;

            // Check for ResultAnswers that reference this question
            var resultAnswers = await _context.ResultAnswers
                .Where(r => r.QuestionId == id)
                .ToListAsync();

            if (resultAnswers.Any())
            {
                _context.ResultAnswers.RemoveRange(resultAnswers);
            }

            _context.Remove(existingQuestion);
            await _context.SaveChangesAsync();

            return existingQuestion;
        }

        public async Task<Question?> GetQuestionByIdAsync(int id)
        {
            return await _context.Questions
                .Include(a => a.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<List<Question>> GetQuestionsByQuizIdAsync(int quizId)
        {
            return await _context.Questions
                .Where(q => q.QuizId == quizId)
                .Include(a => a.Answers)
                .ToListAsync();
        }

        public async Task<Question?> UpdateQuestionAsync(int id, Question questionModel)
        {
            var existingQuestion = await _context.Questions
                .Include(a => a.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (existingQuestion == null) return null;

            existingQuestion.Text = questionModel.Text;
            existingQuestion.Type = questionModel.Type;

            if (questionModel.Answers != null)
            {

                _context.RemoveRange(existingQuestion.Answers);
                existingQuestion.Answers = questionModel.Answers;
            }

            await _context.SaveChangesAsync();

            return existingQuestion;
        }
    }
}