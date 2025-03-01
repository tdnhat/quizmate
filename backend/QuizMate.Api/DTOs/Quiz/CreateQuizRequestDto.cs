using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using QuizMate.Api.DTOs.Question;

namespace QuizMate.Api.DTOs.Quiz
{
    public class CreateQuizRequestDto
    {
        [Required(ErrorMessage = "Title field is required")]
        public string Title { get; set; }
        public string Description { get; set; }
        public List<CreateQuestionRequestDto> Questions { get; set; } = new List<CreateQuestionRequestDto>();
    }
}