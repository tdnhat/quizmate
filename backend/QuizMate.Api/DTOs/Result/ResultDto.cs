using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.DTOs.ResultAnswer;

namespace QuizMate.Api.DTOs.Result
{
    public class ResultDto
    {
        public string Id { get; set; }
        public QuizDto Quiz { get; set; }
        public string AppUserId { get; set; }
        public int Score { get; set; }
        public int MaxScore { get; set; }
        public int CorrectAnswersCount { get; set; }
        public int IncorrectAnswersCount { get; set; }
        public int UnansweredCount { get; set; }
        public bool IsPassed { get; set; }
        public double PassRate { get; set; }
        public DateTime AttemptedAt { get; set; }
        public int TimeTaken { get; set; }
        public List<ResultAnswerDto> ResultAnswers { get; set; }
    }
}