using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Answer;

namespace QuizMate.Api.DTOs.Question
{
    public class CreateQuestionRequestDto
    {
        [Required]
        public string Text { get; set; }
        [Required]
        public string Type { get; set; } = "Multiple Choice";
        public List<CreateAnswerRequestDto> Answers { get; set; } = new List<CreateAnswerRequestDto>();
    }
}