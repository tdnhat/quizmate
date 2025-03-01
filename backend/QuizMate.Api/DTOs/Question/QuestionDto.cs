using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Answer;

namespace QuizMate.Api.DTOs.Question
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }
        public List<AnswerDto> Answers { get; set; } = new List<AnswerDto>();
        public int? QuizId { get; set; }
    }
}