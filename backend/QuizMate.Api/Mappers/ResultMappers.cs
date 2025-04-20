using QuizMate.Api.DTOs.Result;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class ResultMappers
    {
        public static ResultDto ToDto(this Result result)
        {
            return new ResultDto
            {
                Id = result.Id,
                Quiz = result.Quiz.ToDto(),
                AppUserId = result.AppUserId,
                Score = result.Score,
                MaxScore = result.MaxScore,
                CorrectAnswersCount = result.CorrectAnswersCount,
                IncorrectAnswersCount = result.IncorrectAnswersCount,
                UnansweredCount = result.UnansweredCount,
                IsPassed = result.IsPassed,
                PassRate = result.PassRate,
                AttemptedAt = result.AttemptedAt,
                TimeTaken = result.TimeTaken,
                ResultAnswers = result.ResultAnswers.Select(ra => ra.ToDto()).ToList()
            };
        }

        public static Result ToModel(this CreateResultRequestDto createResultRequestDto)
        {
            return new Result
            {
                QuizId = createResultRequestDto.QuizId,
                TimeTaken = createResultRequestDto.TimeTaken,
                ResultAnswers = createResultRequestDto.ResultAnswers.Select(ra => ra.ToModel()).ToList()
            };
        }
    }
}