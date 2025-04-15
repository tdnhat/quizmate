using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Mappers;
using QuizMate.Api.Models;
using QuizMate.Api.DTOs.Quiz;

namespace QuizMate.Api.Controllers
{
    [ApiController]
    [Route("api/saved-quizzes")]
    [Authorize]
    public class SavedQuizController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public SavedQuizController(IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpPost("{quizId}/toggle")]
        public async Task<ActionResult<bool>> ToggleSaveQuiz(string quizId)
        {
            try
            {
                var userEmail = User.GetEmail();
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                {
                    return Unauthorized("User not found");
                }

                var quiz = await _unitOfWork.QuizRepository.GetQuizByIdAsync(quizId);
                if (quiz == null)
                {
                    return NotFound("Quiz not found");
                }

                var isSaved = await _unitOfWork.SavedQuizRepository.ToggleSaveQuizAsync(quizId, user.Id);
                await _unitOfWork.SaveAsync();

                return Ok(new { isSaved });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Failed to toggle quiz save status", details = ex.Message });
            }
        }

        [HttpGet("is-saved/{quizId}")]
        public async Task<ActionResult<bool>> IsQuizSaved(string quizId)
        {
            try
            {
                var userEmail = User.GetEmail();
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                {
                    return Unauthorized("User not found");
                }

                var quiz = await _unitOfWork.QuizRepository.GetQuizByIdAsync(quizId);
                if (quiz == null)
                {
                    return NotFound("Quiz not found");
                }

                var isSaved = await _unitOfWork.SavedQuizRepository.IsSavedByUserAsync(quizId, user.Id);

                return Ok(new { isSaved });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Failed to check quiz save status", details = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Quiz>>> GetSavedQuizzes([FromQuery] QuizQueryObject queryObject)
        {
            try
            {
                var userEmail = User.GetEmail();
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                {
                    return Unauthorized("User not found");
                }

                var savedQuizzes = await _unitOfWork.SavedQuizRepository.GetUserSavedQuizzesAsync(user.Id, queryObject);

                return Ok(savedQuizzes.Select(quiz => quiz.ToSummaryDto()));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Failed to fetch saved quizzes", details = ex.Message });
            }
        }
    }
}