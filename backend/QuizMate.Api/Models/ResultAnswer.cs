using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.Models
{
    public class ResultAnswer
    {
        public int Id { get; set; }
        public int ResultId { get; set; }
        public int QuestionId { get; set; }
        public int AnswerId { get; set; }
        public bool IsCorrect { get; set; }
        public int EarnedPoints { get; set; } = 0;
        public Result Result { get; set; }
        public Question Question { get; set; }
        public Answer Answer { get; set; }
    }
}