using QuizMate.Api.DTOs.Account;

namespace QuizMate.Api.DTOs.Quiz
{
    public class QuizSummaryDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }

        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Thumbnail { get; set; }
        public int? TimeMinutes { get; set; }
        public int QuestionCount { get; set; }
        public string Difficulty { get; set; }
        public int PassingScore { get; set; }
        public bool IsPublic { get; set; }
        public double Rating { get; set; }
        public int Completions { get; set; }

        public string CategoryName { get; set; }
        public UserDto AppUser { get; set; }

        public List<string> Tags { get; set; } = new List<string>();

    }
}