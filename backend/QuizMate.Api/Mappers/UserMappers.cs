using QuizMate.Api.DTOs.Account;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToDto(this AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email ?? "Unknown User",
                UserName = user.UserName ?? "Unknown User",
                DisplayName = user.DisplayName ?? "Unknown User",
                AvatarUrl = user.AvatarUrl ?? "",
                CreatedAt = user.CreatedAt,
                PhoneNumber = user.PhoneNumber ?? "",
            };
        }
    }
}