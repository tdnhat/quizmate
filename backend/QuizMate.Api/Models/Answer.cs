using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.Models
{
    public class Answer
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string QuestionId { get; set; }
        public string Text { get; set; } = string.Empty;
        public bool IsCorrect { get; set; }
        public string? Explanation { get; set; }
        public Question Question { get; set; }
    }
}