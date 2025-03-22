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
                QuizId = result.QuizId,
                AppUserId = result.AppUserId,
                Score = result.Score,
                MaxScore = result.MaxScore,
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
                AppUserId = createResultRequestDto.AppUserId,
                TimeTaken = createResultRequestDto.TimeTaken,
                ResultAnswers = createResultRequestDto.ResultAnswers.Select(ra => ra.ToModel()).ToList()
            };
        }
    }
}