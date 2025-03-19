namespace QuizMate.Api.DTOs.Category
{
    public class CreateCategoryRequestDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public string? Color { get; set; }
    }
}