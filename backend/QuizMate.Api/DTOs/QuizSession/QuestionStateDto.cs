namespace QuizMate.Api.DTOs.QuizSession
{
    public class QuestionStateDto
    {
        public int QuestionIndex { get; set; }
        public string QuestionId { get; set; }
        public string Text { get; set; }
        public string QuestionType { get; set; }
        public string ImageUrl { get; set; }
        public List<QuestionAnswerDto> Answers { get; set; }
        public int TimeRemaining { get; set; }
    }

    public class QuestionAnswerDto
    {
        public string Id { get; set; }
        public string Text { get; set; }
    }
}