using QuizMate.Api.Models;
using QuizMate.Api.DTOs.Quiz;
namespace QuizMate.Api.Interfaces
{
    public interface ISavedQuizRepository
    {
        Task<bool> IsSavedByUserAsync(string quizId, string userId);
        Task<bool> ToggleSaveQuizAsync(string quizId, string userId);
        Task<IEnumerable<Quiz>> GetUserSavedQuizzesAsync(string userId, QuizQueryObject queryObject);
    }
} 