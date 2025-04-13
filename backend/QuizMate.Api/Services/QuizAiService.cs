using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;
using QuizMate.Api.Settings;

namespace QuizMate.Api.Services
{
    public class QuizAiService : IQuizAiService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<QuizAiService> _logger;
        private readonly QuizAiServiceSettings _settings;

        public QuizAiService(
            HttpClient httpClient,
            IOptions<QuizAiServiceSettings> settings,
            ILogger<QuizAiService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _settings = settings.Value;

            // Configure base address from settings
            _httpClient.BaseAddress = new Uri(_settings.BaseUrl);
            _httpClient.Timeout = TimeSpan.FromSeconds(_settings.TimeoutSeconds);
        }

        public async Task<Quiz> GenerateQuizAsync(GenerateAiQuizRequestDto request)
        {
            try
            {
                // Create the API request payload
                var payload = new
                {
                    title = request.Title,
                    difficulty = request.Difficulty,
                    num_questions = request.NumQuestions,
                    include_explanations = request.IncludeExplanations,
                    categoryId = request.CategoryId
                };

                var content = new StringContent(
                    JsonSerializer.Serialize(payload),
                    Encoding.UTF8,
                    "application/json");

                // Send the request to the Python service
                var response = await _httpClient.PostAsync("/api/quiz", content);
                response.EnsureSuccessStatusCode();

                // Parse the response
                var responseString = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                // Parse the response into the AiQuizResponse class
                var aiResponse = JsonSerializer.Deserialize<AiQuizResponse>(responseString, options);

                if (aiResponse == null)
                {
                    throw new Exception("Failed to deserialize AI service response");
                }

                // Convert Python service response to our Quiz model
                var quiz = new Quiz
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = aiResponse.Title,
                    Description = aiResponse.Description,
                    CategoryId = request.CategoryId,
                    Slug = aiResponse.Title.ToLower().Replace(" ", "-"),
                    TimeMinutes = aiResponse.TimeMinutes,
                    PassingScore = aiResponse.PassingScore,
                    Difficulty = aiResponse.Difficulty,
                    IsPublic = true,
                    CreatedAt = DateTime.UtcNow,
                    Questions = aiResponse.Questions.Select(q => new Question
                    {
                        Id = Guid.NewGuid().ToString(),
                        Text = q.Text,
                        QuestionType = q.QuestionType,
                        Points = q.Points,
                        Explanation = q.Explanation,
                        ImageUrl = q.ImageUrl,
                        Answers = q.Answers.Select(a => new Answer
                        {
                            Id = Guid.NewGuid().ToString(),
                            Text = a.Text,
                            IsCorrect = a.IsCorrect,
                            Explanation = a.Explanation
                        }).ToList()
                    }).ToList()
                };

                return quiz;
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error calling AI service: {Message}", ex.Message);
                throw new Exception("Failed to connect to AI service", ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AI quiz generation: {Message}", ex.Message);
                throw new Exception("Failed to generate AI quiz", ex);
            }
        }
    }

    // Classes to deserialize Python service response
    public class AiQuizResponse
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Difficulty { get; set; } = string.Empty;
        public string CategoryId { get; set; } = string.Empty;
        public int TimeMinutes { get; set; }
        public List<AiQuestion> Questions { get; set; } = new List<AiQuestion>();
        public int PassingScore { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
    }

    public class AiQuestion
    {
        public string Text { get; set; } = string.Empty;
        public string QuestionType { get; set; } = string.Empty;
        public int Points { get; set; }
        public List<AiAnswer> Answers { get; set; } = new List<AiAnswer>();
        public string? Explanation { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class AiAnswer
    {
        public string Text { get; set; } = string.Empty;
        public bool IsCorrect { get; set; }
        public string? Explanation { get; set; }
    }
} 