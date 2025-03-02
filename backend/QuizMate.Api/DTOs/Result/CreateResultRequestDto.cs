using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.ResultAnswer;
using QuizMate.Api.Models;

namespace QuizMate.Api.DTOs.Result
{
    public class CreateResultRequestDto
    {
        public List<SubmittedAnswerDto> ResultAnswers { get; set; } = new List<SubmittedAnswerDto>();
    }
}