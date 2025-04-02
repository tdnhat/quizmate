namespace QuizMate.Api.DTOs.QuizSession
{
    public class QuizSessionResultDto
    {
        public string SessionId { get; set; }
        public string QuizId { get; set; }
        public string QuizTitle { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime EndedAt { get; set; }
        public List<ParticipantResultDto> ParticipantResults { get; set; }
    }

    public class ParticipantResultDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int TotalScore { get; set; }
        public int CorrectAnswers { get; set; }
        public int TotalQuestions { get; set; }
        public double AccuracyPercentage { get; set; }
        public TimeSpan AverageResponseTime { get; set; }
        public List<QuizSessionAnswerDto> Answers { get; set; }
    }
}