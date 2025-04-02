namespace QuizMate.Api.DTOs.QuizSession
{
    public class SessionStatusUpdateDto
    {
        public string SessionId { get; set; }
        public string Status { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public int CurrentQuestionIndex { get; set; }
    }
}