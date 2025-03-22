using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using QuizMate.Api.Models;

namespace QuizMate.Api.Helpers
{
    public static class ClaimsPrincipalExtensions
    {
        public static async Task<string?> GetUserIdAsync(this ClaimsPrincipal user, UserManager<AppUser> userManager)
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

            var appUser = await userManager.FindByEmailAsync(userEmail);
            return appUser?.Id;
        }
    }
}