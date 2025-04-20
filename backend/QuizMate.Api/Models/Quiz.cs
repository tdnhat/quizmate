using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.Helpers;

namespace QuizMate.Api.Models
{
    [Table("Quizzes")]
    public class Quiz
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string AppUserId { get; set; } // Owner of the quiz
        public string CategoryId { get; set; }
        public string Slug { get; set; }
        public string? Thumbnail { get; set; }
        public int? TimeMinutes { get; set; }
        public int QuestionCount { get; set; }
        public double Rating { get; set; } = 0;
        public int Completions { get; set; } = 0;
        public string Difficulty { get; set; } = "Beginner";
        public int PassingScore { get; set; } = 0;
        public bool IsPublic { get; set; } = true;
        public AppUser AppUser { get; set; }
        public Category Category { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public List<Question> Questions { get; set; } = new List<Question>();
        public List<Result> Results { get; set; } = new List<Result>();
    }
}