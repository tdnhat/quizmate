namespace QuizMate.Api.DTOs.ResultAnswer
{
    public class ResultAnswerDto
    {
        public string Id { get; set; }
        public string ResultId { get; set; }
        public string QuestionId { get; set; }
        public string AnswerId { get; set; }
        public bool IsCorrect { get; set; }
        public int EarnedPoints { get; set; }
    }
}