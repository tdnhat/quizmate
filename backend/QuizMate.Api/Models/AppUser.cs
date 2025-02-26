using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace QuizMate.Api.Models
{
    public class AppUser : IdentityUser
    {
        public List<Result> Results { get; set; } = new List<Result>(); // One user can have many results
        public List<Quiz> Quizzes { get; set; } = new List<Quiz>(); // One user can create many quizzes
    }
}