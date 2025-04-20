using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IResultRepository
    {
        Task<IEnumerable<Result>> GetAllResultsAsync();
        Task<IEnumerable<Result>> GetResultsByUserIdAsync(string userId);
        Task<Result?> GetResultByIdAsync(string id);
        Task<Result> SubmitQuizAsync(Result result);
    }
}