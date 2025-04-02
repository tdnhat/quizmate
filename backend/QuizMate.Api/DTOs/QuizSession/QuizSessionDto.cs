using QuizMate.Api.DTOs.QuizSessionParticipant;

namespace QuizMate.Api.DTOs.QuizSession
{
    public class QuizSessionDto
    {
        public string Id { get; set; }
        public string QuizId { get; set; }
        public string QuizTitle { get; set; }
        public string HostId { get; set; }
        public string HostName { get; set; }
        public string JoinCode { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public int CurrentQuestionIndex { get; set; }
        public List<QuizSessionParticipantDto> Participants { get; set; }
    }
}