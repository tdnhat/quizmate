using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Mappers;
using QuizMate.Api.Models;

namespace QuizMate.Api.Controllers
{
    [Route("api/quizzes")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IQuizAiService _quizAiService;
        
        public QuizController(
            IUnitOfWork unitOfWork, 
            UserManager<AppUser> userManager, 
            ICloudinaryService cloudinaryService,
            IQuizAiService quizAiService)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _cloudinaryService = cloudinaryService;
            _quizAiService = quizAiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllQuizzes([FromQuery] QuizQueryObject queryObject)
        {
            var quizzes = await _unitOfWork.QuizRepository.GetAllQuizzesAsync(queryObject);
            if (quizzes == null)
            {
                return NotFound();
            }
            return Ok(quizzes.Select(quiz => quiz.ToSummaryDto()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuizById([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var quiz = await _unitOfWork.QuizRepository.GetQuizByIdAsync(id);
            if (quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz.ToDto());
        }

        [HttpGet("slug/{slug}")]
        public async Task<IActionResult> GetQuizBySlug([FromRoute] string slug)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var quiz = await _unitOfWork.QuizRepository.GetQuizBySlugAsync(slug);
            if (quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz.ToDto());
        }

        [HttpGet("category/{slug}")]
        public async Task<IActionResult> GetQuizzesByCategorySlug([FromRoute] string slug)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quizzes = await _unitOfWork.QuizRepository.GetQuizzesByCategorySlugAsync(slug);
            if (quizzes == null)
            {
                return NotFound();
            }
            return Ok(quizzes.Select(quiz => quiz.ToSummaryDto()));
        }

        [HttpPost("upload-thumbnail")]
        [Authorize]
        public async Task<IActionResult> UploadQuizThumbnail(IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var thumbnailUrl = await _cloudinaryService.UploadQuizThumbnailAsync(file);

            return Ok(new ThumbnailResponseDto { ThumbnailUrl = thumbnailUrl });
        }

        [HttpPost("upload-question-image")]
        [Authorize]
        public async Task<IActionResult> UploadQuestionImage(IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var imageUrl = await _cloudinaryService.UploadQuizThumbnailAsync(file);

            return Ok(new ThumbnailResponseDto { ThumbnailUrl = imageUrl });
        }

        [HttpDelete("destroy-thumbnail/{publicId}")]
        [Authorize]
        public async Task<IActionResult> DestroyQuizThumbnail([FromRoute] string publicId)
        {
            await _cloudinaryService.DestroyThumbnailAsync(publicId);
            return Ok();
        }

        [HttpDelete("destroy-question-image/{publicId}")]
        [Authorize]
        public async Task<IActionResult> DestroyQuestionImage([FromRoute] string publicId)
        {
            await _cloudinaryService.DestroyThumbnailAsync(publicId);
            return Ok();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateQuiz([FromBody] CreateQuizRequestDto createQuizRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var quizModel = createQuizRequestDto.ToModelFromCreateDto(user.Id);
            var createdQuiz = await _unitOfWork.QuizRepository.CreateQuizAsync(quizModel);
            await _unitOfWork.SaveAsync();

            if (createdQuiz == null)
            {
                return BadRequest("Failed to create quiz");
            }

            return CreatedAtAction(nameof(GetQuizById), new { id = createdQuiz.Id }, createdQuiz.ToDto());
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateQuiz([FromRoute] string id, [FromBody] UpdateQuizRequestDto updateQuizRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quiz = await _unitOfWork.QuizRepository.GetQuizByIdAsync(id);
            if (quiz == null)
            {
                return NotFound();
            }

            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var updatedQuiz = updateQuizRequestDto.ToModelFromUpdateDto(user.Id, quiz.Id);
            await _unitOfWork.QuizRepository.UpdateQuizAsync(quiz.Id, updatedQuiz);
            await _unitOfWork.SaveAsync();

            return Ok(updatedQuiz.ToDto());
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteQuiz([FromRoute] string id)
        {
            var quiz = await _unitOfWork.QuizRepository.GetQuizByIdAsync(id);
            if (quiz == null)
            {
                return NotFound();
            }

            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            if (!string.IsNullOrEmpty(quiz.Thumbnail))
            {
                var publicId = quiz.Thumbnail.Split('/').Last().Split('.')[0];
                await _cloudinaryService.DestroyThumbnailAsync(publicId);
            }

            await _unitOfWork.QuizRepository.DeleteQuizAsync(id);
            await _unitOfWork.SaveAsync();

            return NoContent();
        }

        [HttpPost("ai-generate")]
        [Authorize]
        public async Task<IActionResult> GenerateAiQuiz([FromBody] GenerateAiQuizRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Call the AI service without saving to database
                var generatedQuiz = await _quizAiService.GenerateQuizAsync(request);
                
                // Return the generated quiz directly to the client
                return Ok(generatedQuiz);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error generating quiz: {ex.Message}");
            }
        }
    }
}