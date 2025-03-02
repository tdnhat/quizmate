using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Answer;
using QuizMate.Api.DTOs.Question;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.DTOs.Result;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class ResultMappers
    {
        public static ResultDto ToResultDto(this Result result)
        {
            return new ResultDto
            {
                Id = result.Id,
                Score = result.Score,
                AttemptedAt = result.AttemptedAt,
                Username = result.AppUser?.UserName,
            };
        }

        public static ResultDetailsDto ToResultDetailsDto(this Result result)
        {
            return new ResultDetailsDto
            {
                Id = result.Id,
                Score = result.Score,
                AttemptedAt = result.AttemptedAt,
                Username = result.AppUser?.UserName,
                SelectedAnswers = result.ResultAnswers?.Select(r => new ResultAnswerDto
                {
                    Id = r.Id,
                    QuestionId = r.QuestionId,
                    QuestionText = r.Question?.Text,
                    AnswerId = r.AnswerId,
                    AnswerText = r.Answer?.Text,
                    IsCorrect = r.Answer?.IsCorrect ?? false,
                }).ToList() ?? new List<ResultAnswerDto>(),
                Quiz = new QuizDetailsDto
                {
                    Id = result.Quiz.Id,
                    Title = result.Quiz.Title,
                    Description = result.Quiz.Description,
                    Questions = result.Quiz.Questions?.Select(q => new QuestionDto
                    {
                        Id = q.Id,
                        Text = q.Text,
                        Type = q.Type,
                        QuizId = q.QuizId,
                        Answers = q.Answers?.Select(a => new AnswerDto
                        {
                            Id = a.Id,
                            Text = a.Text,
                            IsCorrect = a.IsCorrect,
                            QuestionId = a.QuestionId,
                        }).ToList() ?? new List<AnswerDto>()
                    }).ToList() ?? new List<QuestionDto>()
                },
            };
        }

        public static Result ToResultFromCreateDto(this CreateResultRequestDto createResultRequestDto)
        {
            return new Result
            {
                ResultAnswers = createResultRequestDto.ResultAnswers.Select(a => new ResultAnswer
                {
                    QuestionId = a.QuestionId,
                    AnswerId = a.AnswerId,
                }).ToList() ?? new List<ResultAnswer>()
            };
        }
    }
}