using QuizMate.Api.DTOs.ResultAnswer;

namespace QuizMate.Api.DTOs.Result
{
    public class ResultDto
    {
        public string Id { get; set; }
        public string QuizId { get; set; }
        public string AppUserId { get; set; }
        public int Score { get; set; }
        public int MaxScore { get; set; }
        public bool IsPassed { get; set; }
        public double PassRate { get; set; }
        public DateTime AttemptedAt { get; set; }
        public int TimeTaken { get; set; }
        public List<ResultAnswerDto> ResultAnswers { get; set; }
    }
}