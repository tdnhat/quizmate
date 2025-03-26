using QuizMate.Api.DTOs.Account;
using QuizMate.Api.DTOs.Question;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class QuizMappers
    {
        public static QuizSummaryDto ToSummaryDto(this Quiz quiz)
        {
            return new QuizSummaryDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Slug = quiz.Slug,
                Description = quiz.Description,
                CreatedAt = quiz.CreatedAt,
                Thumbnail = quiz.Thumbnail,
                TimeMinutes = quiz.TimeMinutes,
                QuestionCount = quiz.Questions?.Count ?? 0,
                Difficulty = quiz.Difficulty ?? "Beginner",
                PassingScore = quiz.PassingScore,
                IsPublic = quiz.IsPublic,
                Rating = quiz.Rating,
                Completions = quiz.Completions,
                CategoryName = quiz.Category?.Name ?? "Unknown Category",
                AppUser = quiz.AppUser?.ToDto() ?? new UserDto(),
                Tags = quiz.Tags ?? new List<string>(),
            };
        }

        public static QuizDto ToDto(this Quiz quiz)
        {
            return new QuizDto
            {
                Id = quiz.Id,
                Title = quiz.Title,
                Description = quiz.Description,
                CreatedAt = quiz.CreatedAt,
                Slug = quiz.Slug,
                Thumbnail = quiz.Thumbnail,
                TimeMinutes = quiz.TimeMinutes,
                QuestionCount = quiz.Questions?.Count ?? 0,
                Rating = quiz.Rating,
                Completions = quiz.Completions,
                Difficulty = quiz.Difficulty ?? "Beginner",
                PassingScore = quiz.PassingScore,
                IsPublic = quiz.IsPublic,

                CategoryName = quiz.Category?.Name ?? "Unknown Category",
                AppUser = quiz.AppUser?.ToDto() ?? new UserDto(),

                Tags = quiz.Tags ?? new List<string>(),
                Questions = quiz.Questions?.Select(q => q.ToDto()).ToList() ?? new List<QuestionDto>()
            };
        }

        public static Quiz ToModelFromCreateDto(this CreateQuizRequestDto createQuizRequestDto, string userId)
        {
            return new Quiz
            {
                Id = Guid.NewGuid().ToString(),
                Title = createQuizRequestDto.Title,
                Description = createQuizRequestDto.Description,
                CreatedAt = DateTime.Now,
                CategoryId = createQuizRequestDto.CategoryId,
                Thumbnail = createQuizRequestDto.Thumbnail,
                TimeMinutes = createQuizRequestDto.TimeMinutes,
                Difficulty = createQuizRequestDto.Difficulty,
                PassingScore = createQuizRequestDto.PassingScore,
                IsPublic = createQuizRequestDto.IsPublic,
                AppUserId = userId,
                Tags = createQuizRequestDto.Tags,
                Questions = createQuizRequestDto.Questions.Select(q => q.ToModelFromCreateDto(Guid.NewGuid().ToString())).ToList()
            };
        }

        public static Quiz ToModelFromUpdateDto(this UpdateQuizRequestDto updateQuizRequestDto, string userId, string quizId)
        {
            return new Quiz
            {
                Id = quizId,
                Title = updateQuizRequestDto.Title,
                Description = updateQuizRequestDto.Description,
                CategoryId = updateQuizRequestDto.CategoryId,
                Thumbnail = updateQuizRequestDto.Thumbnail,
                TimeMinutes = updateQuizRequestDto.TimeMinutes,
                Difficulty = updateQuizRequestDto.Difficulty,
                PassingScore = updateQuizRequestDto.PassingScore,
                IsPublic = updateQuizRequestDto.IsPublic,
                AppUserId = userId,
                Tags = updateQuizRequestDto.Tags,
                Questions = updateQuizRequestDto.Questions.Select(q =>
                {
                    if (string.IsNullOrEmpty(q.Id))
                    {
                        return q.ToModelWithNewId(quizId);
                    }
                    else
                    {
                        return q.ToModelFromUpdateDto(quizId);
                    }
                }).ToList()
            };
        }
    }
}