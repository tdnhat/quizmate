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
        private readonly IUnitOfWork _unitOfWork;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _unitOfWork.CategoryRepository.GetAllCategoriesAsync();
            return Ok(categories.ToDtoList());
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = await _unitOfWork.CategoryRepository.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category.ToDto());
        }

        [HttpGet("slug/{slug}")]
        public async Task<IActionResult> GetCategoryBySlug([FromRoute] string slug)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = await _unitOfWork.CategoryRepository.GetCategoryBySlugAsync(slug);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category.ToDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto createCategoryRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdCategory = await _unitOfWork.CategoryRepository.CreateCategoryAsync(createCategoryRequestDto.FromCreateDto());
            if (createdCategory == null)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetCategoryById), new { id = createdCategory.Id }, createdCategory.ToDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] string id, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedCategory = await _unitOfWork.CategoryRepository.UpdateCategoryAsync(id, updateCategoryRequestDto.FromUpdateDto(id));
            if (updatedCategory == null)
            {
                return NotFound();
            }
            return Ok(updatedCategory.ToDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var deletedCategory = await _unitOfWork.CategoryRepository.DeleteCategoryAsync(id);
            if (!deletedCategory)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}