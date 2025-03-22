using QuizMate.Api.DTOs.Answer;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class AnswerMappers
    {
        public static AnswerDto ToDto(this Answer answer)
        {
            return new AnswerDto
            {
                Id = answer.Id,
                Text = answer.Text,
                IsCorrect = answer.IsCorrect,
                Explanation = answer.Explanation ?? string.Empty
            };
        }

        public static Answer ToModel(this AnswerDto answerDto, string questionId)
        {
            return new Answer
            {
                Id = answerDto.Id,
                QuestionId = questionId,
                Text = answerDto.Text,
                IsCorrect = answerDto.IsCorrect,
                Explanation = answerDto.Explanation
            };
        }
        public static Answer ToModelFromCreateDto(this CreateAnswerRequestDto createAnswerDto, string questionId)
        {
            return new Answer
            {
                Id = Guid.NewGuid().ToString(), // Generate a new ID for the answer
                QuestionId = questionId,
                Text = createAnswerDto.Text,
                IsCorrect = createAnswerDto.IsCorrect,
                Explanation = createAnswerDto.Explanation
            };
        }
    }
}