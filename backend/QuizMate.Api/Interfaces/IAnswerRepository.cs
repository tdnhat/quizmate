using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Identity.Client.Extensibility;
using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IAnswerRepository
    {
        Task<Answer?> GetAnswerByIdAsync(int id);
        Task<List<Answer>> GetAnswersByQuestionIdAsync(int questionId);
        Task<Answer> CreateAnswerAsync(Answer answerModel);
        Task<Answer?> UpdateAnswerAsync(int id, Answer answerModel);
        Task<Answer?> DeleteAnswerAsync(int id);
    }
}