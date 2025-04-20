using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IQuizRepository
    {
        Task<IEnumerable<Quiz>> GetAllQuizzesAsync(QuizQueryObject queryObject);
        Task<Quiz?> GetQuizByIdAsync(string id);
        Task<IEnumerable<Quiz>> GetQuizzesByCategorySlugAsync(string slug);
        Task<Quiz?> GetQuizBySlugAsync(string slug);
        Task<IEnumerable<Quiz>> GetMyQuizzesAsync(string userId, QuizQueryObject queryObject);
        Task<string> GenerateUniqueSlugAsync(string title);
        Task<Quiz?> CreateQuizAsync(Quiz quiz);
        Task<Quiz?> UpdateQuizAsync(string id, Quiz quiz);
        Task<bool> DeleteQuizAsync(string id);
    }
}