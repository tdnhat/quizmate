namespace QuizMate.Api.DTOs.QuizSessionParticipant
{
    public class QuizSessionParticipantDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int Score { get; set; }
        public bool IsActive { get; set; }
        public DateTime JoinedAt { get; set; }
        public DateTime? LeftAt { get; set; }
    }
}