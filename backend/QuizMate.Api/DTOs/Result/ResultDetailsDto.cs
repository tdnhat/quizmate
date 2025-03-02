using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Quiz;

namespace QuizMate.Api.DTOs.Result
{
    public class ResultDetailsDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Score field is required")]
        public int Score { get; set; }
        public DateTime AttemptedAt { get; set; }
        public string Username { get; set; }
        public List<ResultAnswerDto> SelectedAnswers { get; set; } = new List<ResultAnswerDto>();
        public QuizDetailsDto Quiz { get; set; }
    }
}