using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Answer;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class AnswerMappers
    {
        public static AnswerDto ToAnswerDto(this Answer answer)
        {
            return new AnswerDto
            {

                Id = answer.Id,
                Text = answer.Text,
                IsCorrect = answer.IsCorrect,
                QuestionId = answer.QuestionId,
            };
        }

        public static Answer ToAnswerFromCreateDto(this CreateAnswerRequestDto createAnswerRequestDto, int questionId)
        {
            return new Answer
            {
                Text = createAnswerRequestDto.Text,
                IsCorrect = createAnswerRequestDto.IsCorrect,
                QuestionId = questionId,
            };
        }

        public static Answer ToAnswerFromUpdateDto(this UpdateAnswerRequestDto updateAnswerRequestDto, int questionId)
        {
            return new Answer
            {
                Text = updateAnswerRequestDto.Text,
                IsCorrect = updateAnswerRequestDto.IsCorrect,
                QuestionId = questionId,
            };
        }
    }
}