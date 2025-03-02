using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.DTOs.Result
{
    public class ResultAnswerDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "QuestionId field is required")]
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        [Required(ErrorMessage = "AnswerId field is required")]

        public int AnswerId { get; set; }

        public string AnswerText { get; set; }
        [Required(ErrorMessage = "IsCorrect field is required")]
        public bool IsCorrect { get; set; }
    }
}