using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.Models
{
    public class ResultAnswer
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string ResultId { get; set; }
        public string QuestionId { get; set; }
        public string AnswerId { get; set; }
        public bool IsCorrect { get; set; }
        public int EarnedPoints { get; set; } = 0;
        public Result Result { get; set; }
        public Question Question { get; set; }
        public Answer Answer { get; set; }
    }
}