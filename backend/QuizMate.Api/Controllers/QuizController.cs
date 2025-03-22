using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Mappers;
using QuizMate.Api.Models;
using QuizMate.Api.Repositories;

namespace QuizMate.Api.Controllers
{
    [Route("api/quizzes")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        public QuizController(IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllQuizzes()
        {
            var quizzes = await _unitOfWork.QuizRepository.GetAllQuizzesAsync();
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

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateQuiz([FromBody] CreateQuizRequestDto createQuizRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get the user ID directly from the claims rather than looking up by email
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                // Log the issue - this helps with debugging
                Console.WriteLine("User ID claim not found in token");

                // Fallback to email lookup if needed
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(userEmail))
                {
                    // Debug: Print available claims to console
                    Console.WriteLine("Available claims:");
                    foreach (var claim in User.Claims)
                    {
                        Console.WriteLine($"{claim.Type}: {claim.Value}");
                    }

                    return Unauthorized("User identity could not be determined");
                }

                var appUser = await _userManager.FindByEmailAsync(userEmail);
                if (appUser == null)
                {
                    return Unauthorized("User not found");
                }

                userId = appUser.Id;
            }

            var quizModel = createQuizRequestDto.ToModelFromCreateDto(userId);
            var createdQuiz = await _unitOfWork.QuizRepository.CreateQuizAsync(quizModel);
            await _unitOfWork.SaveAsync();

            if (createdQuiz == null)
            {
                return BadRequest("Failed to create quiz");
            }

            return CreatedAtAction(nameof(GetQuizById), new { id = createdQuiz.Id }, createdQuiz.ToDto());
        }
    }
}