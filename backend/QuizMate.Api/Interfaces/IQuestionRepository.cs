using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IQuestionRepository
    {
        Task<IEnumerable<Question>> GetQuestionsByQuizIdAsync(string quizId);
        Task<Question?> GetQuestionByIdAsync(string id);
        Task<Question?> CreateQuestionAsync(Question question);
        Task<Question?> UpdateQuestionAsync(string id, Question question);
        Task<bool> DeleteQuestionAsync(string id);
    }
}