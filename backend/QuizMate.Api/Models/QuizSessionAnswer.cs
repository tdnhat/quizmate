namespace QuizMate.Api.Models
{
    public class QuizSessionAnswer
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string QuizSessionId { get; set; }
        public string ParticipantId { get; set; }
        public QuizSessionParticipant Participant { get; set; }
        public string QuestionId { get; set; }
        public Question Question { get; set; }
        public string AnswerId { get; set; }
        public Answer Answer { get; set; }
        public bool IsCorrect { get; set; }
        public int PointsEarned { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public TimeSpan TimeTaken { get; set; }
    }
}