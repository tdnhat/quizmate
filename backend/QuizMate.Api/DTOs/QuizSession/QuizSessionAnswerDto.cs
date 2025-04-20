namespace QuizMate.Api.DTOs.QuizSession
{
    public class QuizSessionAnswerDto
    {
        public string Id { get; set; }
        public string ParticipantId { get; set; }
        public string ParticipantName { get; set; }
        public string QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string AnswerId { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
        public int PointsEarned { get; set; }
        public DateTime SubmittedAt { get; set; }
        public TimeSpan TimeTaken { get; set; }
    }
}