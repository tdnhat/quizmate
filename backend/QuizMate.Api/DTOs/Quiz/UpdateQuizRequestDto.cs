using System.ComponentModel.DataAnnotations;
using QuizMate.Api.DTOs.Question;

namespace QuizMate.Api.DTOs.Quiz
{
    public class UpdateQuizRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        [Required]
        public string CategoryId { get; set; } = string.Empty;
        public string? ThumbnailUrl { get; set; } = string.Empty;
        public int? TimeMinutes { get; set; } = 0;
        [Required]
        public string Difficulty { get; set; } = "Beginner";
        public int PassingScore { get; set; } = 0;
        public bool IsPublic { get; set; } = true;
        public List<string> Tags { get; set; } = new List<string>();
        public List<UpdateQuestionRequestDto> Questions { get; set; } = new List<UpdateQuestionRequestDto>();
    }
}