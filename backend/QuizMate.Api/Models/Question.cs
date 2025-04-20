using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.Models
{
    public class Question
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Text { get; set; } = string.Empty;
        public string QuestionType { get; set; } = "multiple-choice"; // multiple-choice, true-false
        public int Points { get; set; } = 1;
        public string? ImageUrl { get; set; }
        public string? Explanation { get; set; }
        public string QuizId { get; set; }
        public Quiz Quiz { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}