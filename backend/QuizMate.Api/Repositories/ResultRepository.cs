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
    public class ResultRepository : IResultRepository
    {

        private readonly ApplicationDbContext _context;
        public ResultRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Result> CreateResultAsync(int quizId, Result resultModel)
        {
            var totalQuestions = 0;
            var correctAnswers = 0;

            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == quizId);

            if (quiz != null)
            {
                // resultModel.QuizId = quizId;
                
                totalQuestions = quiz.Questions?.Count ?? 0;

                if (resultModel.ResultAnswers != null)
                {
                    foreach (var resultAnswer in resultModel.ResultAnswers)
                    {
                        var question = quiz.Questions.FirstOrDefault(q => q.Id == resultAnswer.QuestionId);
                        var answer = question?.Answers.FirstOrDefault(a => a.Id == resultAnswer.AnswerId);

                        resultAnswer.IsCorrect = answer?.IsCorrect ?? false;

                        if (resultAnswer.IsCorrect)
                        {
                            correctAnswers++;
                        }
                    }
                }
            }

            resultModel.Score = correctAnswers;

            await _context.Results.AddAsync(resultModel);
            await _context.SaveChangesAsync();

            return resultModel;
        }

        public async Task<Result?> DeleteResultAsync(int id)
        {
            var existingResult = await _context.Results
                .Include(r => r.ResultAnswers)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (existingResult == null) return null;

            _context.ResultAnswers.RemoveRange(existingResult.ResultAnswers);
            _context.Results.Remove(existingResult);
            await _context.SaveChangesAsync();

            return existingResult;
        }

        public async Task<List<Result>> GetAllResultsAsync()
        {
            return await _context.Results
                .Include(r => r.Quiz)
                .Include(r => r.AppUser)
                .ToListAsync();
        }

        public async Task<Result?> GetResultByIdAsync(int id)
        {
            return await _context.Results
                .Include(r => r.AppUser)
                .Include(r => r.Quiz)
                .ThenInclude(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .Include(r => r.ResultAnswers)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Result>> GetResultsByQuizIdAsync(int quizId)
        {
            return await _context.Results
                .Include(r => r.Quiz)
                .Include(r => r.AppUser)
                .Where(r => r.QuizId == quizId)
                .ToListAsync();
        }

        public async Task<List<Result>> GetResultsByUserIdAsync(string userId)
        {
            return await _context.Results
                .Include(r => r.AppUser)
                .Where(r => r.AppUserId == userId)
                .ToListAsync();
        }
    }
}