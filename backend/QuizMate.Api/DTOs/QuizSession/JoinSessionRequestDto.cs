using System.ComponentModel.DataAnnotations;

namespace QuizMate.Api.DTOs.QuizSession
{
    public class JoinSessionRequestDto
    {
        [Required]
        [StringLength(6, MinimumLength = 6)]
        public string JoinCode { get; set; }
    }
}