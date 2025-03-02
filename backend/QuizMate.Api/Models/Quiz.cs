using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.Models
{
    [Table("Quizzes")]
    public class Quiz
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string AppUserId { get; set; } // Owner of the quiz
        
        public AppUser AppUser { get; set; }
        public List<Question> Questions { get; set; } = new List<Question>();
        public List<Result> Results { get; set; } = new List<Result>();
    }
}