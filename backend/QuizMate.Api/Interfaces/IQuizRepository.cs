using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IQuizRepository
    {
        Task<IEnumerable<Quiz>> GetAllQuizzesAsync();
        Task<IEnumerable<Quiz>> GetQuizBySlugAsync(string slug);
        Task<IEnumerable<Quiz>> GetQuizzesByCategorySlugAsync(string categorySlug);
        Task<IEnumerable<Quiz>> GetQuizzesByCategoryIdAsync(string categoryId);
        Task<IEnumerable<Quiz>> GetQuizzesByUserIdAsync(string userId);
        Task<Quiz?> GetQuizByIdAsync(string id);
        Task<Quiz?> CreateQuizAsync(Quiz quiz);
        Task<Quiz?> UpdateQuizAsync(string id, Quiz quiz);
        Task<bool> DeleteQuizAsync(string id);
    }
}