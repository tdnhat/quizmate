using System.ComponentModel.DataAnnotations;

namespace QuizMate.Api.DTOs.QuizSession
{
    public class SubmitAnswerRequestDto
    {
        [Required]
        public string QuestionId { get; set; }
        
        [Required]
        public string AnswerId { get; set; }
        
        public TimeSpan TimeTaken { get; set; }
    }
}