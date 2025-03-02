using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IResultRepository
    {
        Task<List<Result>> GetAllResultsAsync();
        Task<Result?> GetResultByIdAsync(int id);
        Task<List<Result>> GetResultsByQuizIdAsync(int quizId);
        Task<List<Result>> GetResultsByUserIdAsync(string userId);
        Task<Result> CreateResultAsync(int quizId, Result resultModel);
        Task<Result?> DeleteResultAsync(int id);
    }
}