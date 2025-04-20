using System.ComponentModel.DataAnnotations;

namespace QuizMate.Api.DTOs.Quiz
{
    public class GenerateAiQuizRequestDto
    {
        [Required]
        [MinLength(3)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Difficulty { get; set; } = "Intermediate"; // Beginner, Intermediate, Advanced

        [Required]
        public string CategoryId { get; set; } = string.Empty;

        [Range(1, 20)]
        public int NumQuestions { get; set; } = 5;

        public bool IncludeExplanations { get; set; } = true;
    }
} 