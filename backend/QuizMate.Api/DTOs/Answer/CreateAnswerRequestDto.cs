using System.ComponentModel.DataAnnotations;

namespace QuizMate.Api.DTOs.Answer
{
    public class CreateAnswerRequestDto
    {
        [Required]
        public string Text { get; set; } = string.Empty;
        [Required]
        public bool IsCorrect { get; set; } = false;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? Explanation { get; set; } = string.Empty;
    }
}