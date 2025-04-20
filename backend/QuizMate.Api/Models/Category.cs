namespace QuizMate.Api.Models
{
    public class Category
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string ColorPreset { get; set; } = string.Empty;
        public string? Image { get; set; }
        public List<Quiz> Quizzes { get; set; } = new List<Quiz>();
        public bool IsFeatured { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int QuizCount { get; set; } = 0;
    }
}