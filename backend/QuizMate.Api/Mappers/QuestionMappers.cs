using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Answer;
using QuizMate.Api.DTOs.Question;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class QuestionMappers
    {
        public static QuestionDto ToQuestionDto(this Question question)
        {
            return new QuestionDto
            {
                Id = question.Id,
                Text = question.Text,
                Type = question.Type,
                Answers = question.Answers.Select(a => new AnswerDto
                {
                    Id = a.Id,
                    Text = a.Text,
                    IsCorrect = a.IsCorrect,
                    QuestionId = a.QuestionId,
                }).ToList() ?? new List<AnswerDto>(),
                QuizId = question.QuizId,
            };
        }

        public static Question ToQuestionFromCreateDto(this CreateQuestionRequestDto createQuestionRequestDto, int quizId)
        {
            return new Question
            {
                Text = createQuestionRequestDto.Text,
                Type = createQuestionRequestDto.Type,
                QuizId = quizId,
                Answers = createQuestionRequestDto.Answers.Select(a => new Answer
                {
                    Text = a.Text,
                    IsCorrect = a.IsCorrect,
                }).ToList() ?? new List<Answer>(),
            };
        }

        public static Question ToQuestionFromUpdateDto(this UpdateQuestionRequestDto updateQuestionRequestDto, int quizId)
        {
            return new Question
            {
                Text = updateQuestionRequestDto.Text,
                Type = updateQuestionRequestDto.Type,
                QuizId = quizId,
                Answers = updateQuestionRequestDto.Answers.Select(a => new Answer
                {
                    Text = a.Text,
                    IsCorrect = a.IsCorrect,
                }).ToList() ?? new List<Answer>(),
            };
        }
    }
}