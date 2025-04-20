using System.ComponentModel.DataAnnotations;

namespace QuizMate.Api.DTOs.Account
{
    public class UpdateProfileDto
    {
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Display name must be between 3 and 50 characters")]
        public string? DisplayName { get; set; }
        
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? Email { get; set; }
        
        [StringLength(30, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        [RegularExpression(@"^[a-zA-Z0-9._]*$", ErrorMessage = "Username can only contain letters, numbers, dots, and underscores")]
        public string? UserName { get; set; }
        
        [Phone(ErrorMessage = "Invalid phone number")]
        public string? PhoneNumber { get; set; }
    }
} 