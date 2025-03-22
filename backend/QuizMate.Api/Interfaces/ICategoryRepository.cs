using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategoriesAsync();
        Task<Category?> GetCategoryByIdAsync(string id);
        Task<Category?> GetCategoryBySlugAsync(string slug);
        Task<Category?> CreateCategoryAsync(Category category);
        Task<Category?> UpdateCategoryAsync(string id, Category category);
        Task<bool> DeleteCategoryAsync(string id);
    }
}