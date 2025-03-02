using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.DTOs.Answer
{
    public class CreateAnswerRequestDto
    {
        [Required(ErrorMessage = "Text field is required")]

        public string Text { get; set; }
        [Required(ErrorMessage = "IsCorrect field is required")]

        public bool IsCorrect { get; set; }
    }
}