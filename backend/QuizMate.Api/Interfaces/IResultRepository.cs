using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IResultRepository
    {
        Task<Result> GetResultByIdAsync(string id);
        Task<IEnumerable<Result>> GetResultsByQuizIdAsync(string quizId);
        Task<IEnumerable<Result>> GetResultsByUserIdAsync(string userId);
        Task<Result?> CreateResultAsync(Result result);
        Task<ResultAnswer?> CreateResultAnswerAsync(ResultAnswer resultAnswer);
        Task<Result?> UpdateResultAsync(string id, Result result);
        Task<bool> DeleteResultAsync(string id);
    }
}