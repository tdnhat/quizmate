using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IQuizRepository
    {
        Task<List<Quiz>> GetAllQuizzesAsync();
        Task<Quiz?> GetQuizByIdAsync(int id);
        Task<Quiz> CreateQuizAsync(Quiz quizModel);
        Task<Quiz?> UpdateQuizAsync(int id, Quiz quizModel);
        Task<Quiz?> DeleteQuizAsync(int id);
    }
}