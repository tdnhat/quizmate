using QuizMate.Api.DTOs.ResultAnswer;

namespace QuizMate.Api.DTOs.Result
{
    public class CreateResultRequestDto
    {
        public string QuizId { get; set; }
        public int TimeTaken { get; set; }
        public List<CreateResultAnswerRequestDto> ResultAnswers { get; set; }
    }
}