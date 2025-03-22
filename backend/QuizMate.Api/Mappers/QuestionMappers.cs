using QuizMate.Api.DTOs.Question;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class QuestionMappers
    {
        public static QuestionDto ToDto(this Question question)
        {
            return new QuestionDto
            {
                Id = question.Id,
                Text = question.Text,
                QuestionType = question.QuestionType,
                Points = question.Points,
                ImageUrl = question.ImageUrl,
                Explanation = question.Explanation,
                Answers = question.Answers.Select(a => a.ToDto()).ToList()
            };
        }

        public static Question ToModel(this QuestionDto questionDto, string quizId)
        {
            return new Question
            {
                Id = questionDto.Id,
                QuizId = quizId,
                Text = questionDto.Text,
                QuestionType = questionDto.QuestionType,
                Points = questionDto.Points,
                ImageUrl = questionDto.ImageUrl,
                Explanation = questionDto.Explanation,
                Answers = questionDto.Answers.Select(a => a.ToModel(questionDto.Id)).ToList()
            };
        }

        public static Question ToModelFromCreateDto(this CreateQuestionRequestDto createQuestionDto, string quizId)
        {
            return new Question
            {
                Id = Guid.NewGuid().ToString(),
                QuizId = quizId,
                Text = createQuestionDto.Text,
                QuestionType = createQuestionDto.QuestionType,
                Points = createQuestionDto.Points,
                ImageUrl = createQuestionDto.ImageUrl,
                Explanation = createQuestionDto.Explanation,
                Answers = createQuestionDto.Answers.Select(a => a.ToModelFromCreateDto(Guid.NewGuid().ToString())).ToList()
            };
        }
    }
}