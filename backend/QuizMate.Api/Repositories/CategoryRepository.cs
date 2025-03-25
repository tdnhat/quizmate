using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
using QuizMate.Api.Helpers;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Category?> CreateCategoryAsync(Category category)
        {
            category.Slug = SlugHelper.GenerateSlug(category.Name);
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteCategoryAsync(string id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
            {
                return false;
            }
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories
                .Include(c => c.Quizzes)
                .ToListAsync();
        }

        public async Task<Category?> GetCategoryByIdAsync(string id)
        {
            return await _context.Categories
                .Include(c => c.Quizzes)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category?> GetCategoryBySlugAsync(string slug)
        {
            return await _context.Categories
                .Include(c => c.Quizzes)
                .FirstOrDefaultAsync(c => c.Slug == slug);
        }

        public async Task<List<Category>> GetFeaturedCategoriesAsync()
        {
            return await _context.Categories
                .Include(c => c.Quizzes)
                .Where(c => c.IsFeatured)
                .ToListAsync();
        }

        public async Task<List<Category>> GetPopularCategoriesAsync()
        {
            return await _context.Categories
                .Include(c => c.Quizzes)
                .OrderByDescending(c => c.Quizzes.Count)
                .ToListAsync();
        }

        public async Task<List<Category>> GetRecentlyAddedCategoriesAsync()
        {
            return await _context.Categories
                .Include(c => c.Quizzes)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
        }

        public async Task<Category?> ToggleFeaturedAsync(string id)
        {
            var category = await _context.Categories
                .Include(c => c.Quizzes)
                .FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
            {
                return null;
            }
            category.IsFeatured = !category.IsFeatured;
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category?> UpdateCategoryAsync(string id, Category category)
        {
            var existingCategory = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == id);
            if (existingCategory == null)
            {
                return null;
            }
            existingCategory.Name = category.Name;
            existingCategory.Color = category.Color;
            existingCategory.Image = category.Image;
            existingCategory.Description = category.Description;
            existingCategory.Slug = SlugHelper.GenerateSlug(category.Name);

            await _context.SaveChangesAsync();
            return existingCategory;
        }
    }
}