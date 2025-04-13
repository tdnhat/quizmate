namespace QuizMate.Api.Settings
{
    public class QuizAiServiceSettings
    {
        public string BaseUrl { get; set; } = "http://localhost:8000";
        public int TimeoutSeconds { get; set; } = 30;
    }
} 