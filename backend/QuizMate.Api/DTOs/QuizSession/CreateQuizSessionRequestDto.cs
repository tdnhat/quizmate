using System.ComponentModel.DataAnnotations;

namespace QuizMate.Api.DTOs.QuizSession
{
    public class CreateQuizSessionRequestDto
    {
        [Required]
        public string QuizId { get; set; }
    }
}