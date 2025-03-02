using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.Models
{
    public class Result
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public int QuizId { get; set; }
        public int Score { get; set; }
        public DateTime AttemptedAt { get; set; } = DateTime.Now;

        public AppUser AppUser { get; set; }
        public Quiz Quiz { get; set; }
        public List<ResultAnswer> ResultAnswers { get; set; } = new List<ResultAnswer>();
    }
}