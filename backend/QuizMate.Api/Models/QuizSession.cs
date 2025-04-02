namespace QuizMate.Api.Models
{
    public class QuizSession
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string QuizId { get; set; }
        public Quiz Quiz { get; set; }
        public string HostId { get; set; }
        public AppUser Host { get; set; }
        public List<QuizSessionParticipant> Participants { get; set; } = new List<QuizSessionParticipant>();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public string Status { get; set; } = "Waiting";
        public string JoinCode { get; set; } = Guid.NewGuid().ToString("N").Substring(0, 6);
        public int CurrentQuestionIndex { get; set; } = -1;

    }
}