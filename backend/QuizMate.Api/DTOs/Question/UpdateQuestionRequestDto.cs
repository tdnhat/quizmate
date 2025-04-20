using System.ComponentModel.DataAnnotations;
using QuizMate.Api.DTOs.Answer;

namespace QuizMate.Api.DTOs.Question
{
    public class UpdateQuestionRequestDto
    {
        [Required]
        public string Id { get; set; } = string.Empty;
        [Required]
        public string Text { get; set; } = string.Empty;
        [Required]
        public string QuestionType { get; set; } = string.Empty;
        [Required]
        public int Points { get; set; } = 1;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? Explanation { get; set; } = string.Empty;
        public List<UpdateAnswerRequestDto> Answers { get; set; } = new List<UpdateAnswerRequestDto>();
    }
}