using QuizMate.Api.DTOs.Account;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this AppUser user, string token, string role)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                AvatarUrl = user.AvatarUrl,
                PhoneNumber = user.PhoneNumber,
                Role = role,
                CreatedAt = user.CreatedAt,
                Token = token
            };
        }

        public static void UpdateFromDto(this AppUser user, UpdateProfileDto updateDto)
        {
            // Only update properties that were provided in the DTO
            if (!string.IsNullOrWhiteSpace(updateDto.DisplayName))
                user.DisplayName = updateDto.DisplayName;
                
            if (!string.IsNullOrWhiteSpace(updateDto.Email))
                user.Email = updateDto.Email;
                
            if (!string.IsNullOrWhiteSpace(updateDto.UserName))
                user.UserName = updateDto.UserName;
                
            if (updateDto.PhoneNumber != null) // Allow empty string to clear phone number
                user.PhoneNumber = updateDto.PhoneNumber;
        }
    }
}