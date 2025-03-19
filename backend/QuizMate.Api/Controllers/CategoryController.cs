using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.DTOs.Category;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Mappers;
using QuizMate.Api.Models;

namespace QuizMate.Api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllCategoriesAsync();
            return Ok(categories.ToDtoList());
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category.ToDto());
        }

        [HttpGet("slug/{slug}")]
        public async Task<IActionResult> GetCategoryBySlug([FromRoute] string slug)
        {
            var category = await _categoryRepository.GetCategoryBySlugAsync(slug);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category.ToDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto createCategoryRequestDto)
        {
            var createdCategory = await _categoryRepository.CreateCategoryAsync(createCategoryRequestDto.FromCreateDto());
            if (createdCategory == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetCategoryById), new { id = createdCategory.Id }, createdCategory.ToDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] int id, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            var updatedCategory = await _categoryRepository.UpdateCategoryAsync(id, updateCategoryRequestDto.FromUpdateDto(id));
            if (updatedCategory == null)
            {
                return NotFound();
            }
            return Ok(updatedCategory.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            var deletedCategory = await _categoryRepository.DeleteCategoryAsync(id);
            if (!deletedCategory)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}