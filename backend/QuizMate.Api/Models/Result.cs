using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.Models
{
    public class Result
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string AppUserId { get; set; } // User who took the quiz
        public string QuizId { get; set; } // Quiz that was taken
        public int Score { get; set; }
        public int MaxScore { get; set; }
        public int CorrectAnswersCount { get; set; } = 0;
        public int IncorrectAnswersCount { get; set; } = 0;
        public int UnansweredCount { get; set; } = 0;
        public DateTime AttemptedAt { get; set; } = DateTime.UtcNow;
        public int TimeTaken { get; set; } // in seconds
        public bool IsPassed { get; set; } = false;
        public double PassRate { get; set; } = 0;
        public AppUser AppUser { get; set; }
        public Quiz Quiz { get; set; }
        public List<ResultAnswer> ResultAnswers { get; set; } = new List<ResultAnswer>();
    }
}