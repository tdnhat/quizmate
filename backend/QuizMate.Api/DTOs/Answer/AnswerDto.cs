namespace QuizMate.Api.DTOs.Answer
{
    public class AnswerDto
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
        public string Explanation { get; set; }
    }
}