using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Answer;

namespace QuizMate.Api.DTOs.Question
{
    public class UpdateQuestionRequestDto
    {
        [Required(ErrorMessage = "Text field is required")]
        public string Text { get; set; }
        [Required(ErrorMessage = "Type field is required")]
        public string Type { get; set; } = "Multiple Choice";
        public List<UpdateAnswerRequestDto> Answers { get; set; } = new List<UpdateAnswerRequestDto>();
    }
}