using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace QuizMate.Api.Models
{
    public class AppUser : IdentityUser
    {
        public string AvatarUrl { get; set; } = string.Empty; // Profile picture
        public string DisplayName { get; set; } = string.Empty; // Display name
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Created at
        // Relationships
        public List<Quiz> CreatedQuizzes { get; set; } = new(); // Quizzes created by user
        public List<Result> QuizResults { get; set; } = new(); // Quizzes user has completed
        public List<SavedQuiz> SavedQuizzes { get; set; } = new(); // Quizzes saved for later
        // public List<Team> Teams { get; set; } = new();
    }
}