using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IQuizAiService
    {
        /// <summary>
        /// Generates a quiz using the AI service
        /// </summary>
        /// <param name="request">The AI quiz generation request parameters</param>
        /// <returns>A quiz object with AI-generated questions</returns>
        Task<Quiz> GenerateQuizAsync(GenerateAiQuizRequestDto request);
    }
} 