using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using QuizMate.Api.Models;

namespace QuizMate.Api.Services
{
    public class AuthService
    {
        private readonly UserManager<AppUser> _userManager;

        public AuthService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string?> GetUserIdAsync(ClaimsPrincipal user)
        {
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                return userId;
            }

            Console.WriteLine("User ID claim not found in token");

            var userEmail = user.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(userEmail))
            {
                Console.WriteLine("Available claims:");
                foreach (var claim in user.Claims)
                {
                    Console.WriteLine($"{claim.Type}: {claim.Value}");
                }

                return null;
            }

            var appUser = await _userManager.FindByEmailAsync(userEmail);
            return appUser?.Id;
        }
    }
}