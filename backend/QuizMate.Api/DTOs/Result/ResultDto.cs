using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Models;

namespace QuizMate.Api.DTOs.Result
{
    public class ResultDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Score field is required")]
        public int Score { get; set; }
        public DateTime AttemptedAt { get; set; }
        public string Username { get; set; }
    }
}