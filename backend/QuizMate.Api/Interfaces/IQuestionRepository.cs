using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IQuestionRepository
    {
        Task<Question?> GetQuestionByIdAsync(int id);
        Task<List<Question>> GetQuestionsByQuizIdAsync(int quizId);
        Task<Question> CreateQuestionAsync(Question questionModel);
        Task<Question?> UpdateQuestionAsync(int id, Question questionModel);
        Task<Question?> DeleteQuestionAsync(int id);
    }
}