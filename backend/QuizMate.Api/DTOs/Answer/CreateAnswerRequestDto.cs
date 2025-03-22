namespace QuizMate.Api.DTOs.Answer
{
    public class CreateAnswerRequestDto
    {
        public string Text { get; set; } = string.Empty;
        public bool IsCorrect { get; set; } = false;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? Explanation { get; set; } = string.Empty;
    }
}