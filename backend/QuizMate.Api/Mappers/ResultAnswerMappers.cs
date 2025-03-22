using QuizMate.Api.DTOs.ResultAnswer;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class ResultAnswerMappers
    {
        public static ResultAnswerDto ToDto(this ResultAnswer resultAnswer)
        {
            return new ResultAnswerDto
            {
                Id = resultAnswer.Id,
                ResultId = resultAnswer.ResultId,
                QuestionId = resultAnswer.QuestionId,
                AnswerId = resultAnswer.AnswerId,
                IsCorrect = resultAnswer.IsCorrect,
                EarnedPoints = resultAnswer.EarnedPoints
            };
        }

        public static ResultAnswer ToModel(this CreateResultAnswerRequestDto createResultAnswerRequestDto)
        {
            return new ResultAnswer
            {
                QuestionId = createResultAnswerRequestDto.QuestionId,
                AnswerId = createResultAnswerRequestDto.AnswerId,
            };
        }
    }
}