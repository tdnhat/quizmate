using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Type { get; set; } = "Multiple Choice"; // Multiple Choice, True/False, Short Answer
        public int QuizId { get; set; }
        
        public Quiz Quiz { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}