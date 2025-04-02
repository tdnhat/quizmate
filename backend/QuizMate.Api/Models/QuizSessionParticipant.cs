namespace QuizMate.Api.Models
{
    public class QuizSessionParticipant
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string QuizSessionId { get; set; }
        public QuizSession QuizSession { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public string ConnectionId { get; set; }
        public int Score { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LeftAt { get; set; }


    }
}