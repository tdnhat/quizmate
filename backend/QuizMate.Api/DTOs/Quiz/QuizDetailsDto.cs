using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.DTOs.Question;
using QuizMate.Api.Models;

namespace QuizMate.Api.DTOs.Quiz
{
    public class QuizDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<QuestionDto> Questions { get; set; }
    }
}