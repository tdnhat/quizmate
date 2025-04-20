using QuizMate.Api.DTOs.Category;
using QuizMate.Api.Helpers;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDto ToDto(this Category category)
        {
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                ColorPreset = category.ColorPreset,
                Image = category.Image ?? string.Empty,
                Description = category.Description ?? string.Empty,
                QuizCount = category.Quizzes.Count,
                IsFeatured = category.IsFeatured,
                CreatedAt = category.CreatedAt
            };
        }

        public static Category ToModel(this CategoryDto categoryDto)
        {
            return new Category
            {
                Id = categoryDto.Id,
                Name = categoryDto.Name,
                Slug = categoryDto.Slug,
                ColorPreset = categoryDto.ColorPreset,
                Image = categoryDto.Image ?? string.Empty,
                Description = categoryDto.Description ?? string.Empty,
                IsFeatured = categoryDto.IsFeatured,
                CreatedAt = categoryDto.CreatedAt
            };
        }

        public static List<CategoryDto> ToDtoList(this List<Category> categories)
        {
            return categories.Select(ToDto).ToList();
        }

        public static List<Category> ToModelList(this List<CategoryDto> categoryDtos)
        {
            return categoryDtos.Select(ToModel).ToList();
        }

        public static Category FromCreateDto(this CreateCategoryRequestDto createCategoryRequestDto)
        {
            return new Category
            {
                Name = createCategoryRequestDto.Name,
                ColorPreset = createCategoryRequestDto.ColorPreset ?? ColorHelper.GetRandomColorPreset(),
                Image = createCategoryRequestDto.Image ?? string.Empty,
                Description = createCategoryRequestDto.Description ?? string.Empty
            };
        }

        public static Category FromUpdateDto(this UpdateCategoryRequestDto updateCategoryRequestDto, string id)
        {
            return new Category
            {
                Id = id,
                Name = updateCategoryRequestDto.Name,
                ColorPreset = updateCategoryRequestDto.ColorPreset ?? ColorHelper.GetRandomColorPreset(),
                Image = updateCategoryRequestDto.Image ?? string.Empty,
                Description = updateCategoryRequestDto.Description ?? string.Empty
            };
        }
    }
}