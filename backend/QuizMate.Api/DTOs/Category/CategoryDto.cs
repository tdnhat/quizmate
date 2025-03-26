namespace QuizMate.Api.DTOs.Category
{
    public class CategoryDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string ColorPreset { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public int QuizCount { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}