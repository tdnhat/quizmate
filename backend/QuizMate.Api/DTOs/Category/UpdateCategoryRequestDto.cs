namespace QuizMate.Api.DTOs.Category
{
    public class UpdateCategoryRequestDto
    {
        public string Name { get; set; }
        public string ColorPreset { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }
}