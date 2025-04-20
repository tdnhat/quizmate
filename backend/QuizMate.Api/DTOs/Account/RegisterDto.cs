using System.ComponentModel.DataAnnotations;

namespace QuizMate.Api.DTOs.Account.Register
{
    public class RegisterDto
    {
        [Required]
        [MinLength(3)]
        public string Username { get; set; }
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