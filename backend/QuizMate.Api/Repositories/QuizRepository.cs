using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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


        public async Task<Quiz> CreateQuizAsync(Quiz quizModel)
        {
            await _context.Quizzes.AddAsync(quizModel);
            await _context.SaveChangesAsync();
            return quizModel;
        }

        public async Task<Quiz?> DeleteQuizAsync(int id)
        {
            var quizModel = await _context.Quizzes.FirstOrDefaultAsync(q => q.Id == id);

            if (quizModel == null) return null;

            _context.Remove(quizModel);
            await _context.SaveChangesAsync();
            return quizModel;
        }

        public async Task<List<Quiz>> GetAllQuizzesAsync()
        {
            return await _context.Quizzes
                .Include(q => q.Questions)
                .ToListAsync();
        }

        public async Task<Quiz?> GetQuizByIdAsync(int id)
        {
            return await _context.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(a => a.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<Quiz?> UpdateQuizAsync(int id, Quiz quizModel)
        {
            var existingQuiz = await _context.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (existingQuiz == null) return null;

            existingQuiz.Title = quizModel.Title;
            existingQuiz.Description = quizModel.Description;
            _context.Questions.RemoveRange(existingQuiz.Questions);
            existingQuiz.Questions = quizModel.Questions;

            await _context.SaveChangesAsync();

            return existingQuiz;
        }
    }
}