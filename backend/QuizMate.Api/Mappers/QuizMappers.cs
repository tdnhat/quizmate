using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Answer;
using QuizMate.Api.DTOs.Question;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class QuizMappers
    {
        public static QuizDto ToQuizDto(this Quiz quiz)
        {
            return new QuizDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                CreatedAt = quiz.CreatedAt,
            };
        }

        public static QuizDetailsDto ToQuizDetailsDto(this Quiz quiz)
        {
            return new QuizDetailsDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                CreatedAt = quiz.CreatedAt,
                Questions = quiz.Questions?.Select(q => new QuestionDto
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
            };
        }

        public static Quiz ToQuizFromCreateDto(this CreateQuizRequestDto createQuizRequestDto)
        {
            var quiz = new Quiz
            {
                Title = createQuizRequestDto.Title,
                Description = createQuizRequestDto.Description,
                Questions = createQuizRequestDto.Questions?.Select(q => new Question
                {
                    Text = q.Text,
                    Type = q.Type,
                    Answers = q.Answers?.Select(a => new Answer
                    {
                        Text = a.Text,
                        IsCorrect = a.IsCorrect
                    }).ToList() ?? new List<Answer>()
                }).ToList() ?? new List<Question>()
            };

            return quiz;
        }

        public static Quiz ToQuizFromUpdateDto(this UpdateQuizRequestDto updateQuizRequestDto)
        {
            return new Quiz
            {
                Title = updateQuizRequestDto.Title,
                Description = updateQuizRequestDto.Description,
                Questions = updateQuizRequestDto.Questions?.Select(q => new Question
                {
                    Text = q.Text,
                    Type = q.Type,
                    Answers = q.Answers?.Select(a => new Answer
                    {
                        Text = a.Text,
                        IsCorrect = a.IsCorrect,
                    }).ToList() ?? new List<Answer>()
                }).ToList() ?? new List<Question>()
            };
        }
    }
}