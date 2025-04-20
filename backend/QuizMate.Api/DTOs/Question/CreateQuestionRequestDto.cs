using QuizMate.Api.DTOs.Answer;

namespace QuizMate.Api.DTOs.Question
{
    public class CreateQuestionRequestDto
    {
        public string Text { get; set; } = string.Empty;
        public string QuestionType { get; set; } = string.Empty;
        public int Points { get; set; } = 1;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? Explanation { get; set; } = string.Empty;
        public List<CreateAnswerRequestDto> Answers { get; set; } = new List<CreateAnswerRequestDto>();
    }
}