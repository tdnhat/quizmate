using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IAnswerRepository 
    {
        Task<IEnumerable<Answer>> GetAnswersByQuestionIdAsync(string questionId);
        Task<Answer?> GetAnswerByIdAsync(string id);
        Task<Answer?> CreateAnswerAsync(Answer answer);
        Task<Answer?> UpdateAnswerAsync(string id, Answer answer);
        Task<bool> DeleteAnswerAsync(string id);
    }
}