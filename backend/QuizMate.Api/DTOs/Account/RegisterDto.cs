using System.ComponentModel.DataAnnotations;

namespace QuizMate.Api.DTOs.Account.Register
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
        [Required]
        [MinLength(8)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}