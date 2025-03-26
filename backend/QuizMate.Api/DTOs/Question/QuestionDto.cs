using QuizMate.Api.DTOs.Answer;

namespace QuizMate.Api.DTOs.Question
{
    public class QuestionDto
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public string QuestionType { get; set; }
        public int Points { get; set; }
        public string? ImageUrl { get; set; }
        public string? Explanation { get; set; }
        public List<AnswerDto> Answers { get; set; } = new List<AnswerDto>();
    }
}