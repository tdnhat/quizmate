using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.DTOs.ResultAnswer
{
    public class SubmittedAnswerDto
    {
        [Required(ErrorMessage = "QuestionId field is required")]
        public int QuestionId { get; set; }
        [Required(ErrorMessage = "AnswerId field is required")]
        public int AnswerId { get; set; }
    }
}