using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuizMate.Api.DTOs.Quiz
{
    public class QuizDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Title field is required")]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}