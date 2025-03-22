using System.ComponentModel.DataAnnotations;
using QuizMate.Api.DTOs.Question;

namespace QuizMate.Api.DTOs.Quiz
{
    public class CreateQuizRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        [Required]
        public string CategoryId { get; set; } = string.Empty;
        public string? Thumbnail { get; set; } = string.Empty;
        public int? TimeMinutes { get; set; } = 0;
        [Required]
        public string Difficulty { get; set; } = "Beginner";
        public int PassingScore { get; set; } = 0;
        public bool IsPublic { get; set; } = true;
        public string AppUserId { get; set; } = string.Empty;
        public List<string> Tags { get; set; } = new List<string>();
        public List<CreateQuestionRequestDto> Questions { get; set; } = new List<CreateQuestionRequestDto>();
    }
}