namespace QuizMate.Api.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string? Image { get; set; }
        public List<Quiz> Quizzes { get; set; } = new List<Quiz>();
    }
}