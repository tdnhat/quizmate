using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.DTOs.Result;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Mappers;
using QuizMate.Api.Models;

namespace QuizMate.Api.Controllers
{
    [Route("api/results")]
    [ApiController]
    [Authorize]
    public class ResultController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        public ResultController(IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllResults()
        {
            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized();
            }

            var results = await _unitOfWork.ResultRepository.GetAllResultsAsync();
            return Ok(results.Select(r => r.ToDto()));
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetResultsByUserId()
        {
            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized();
            }

            var results = await _unitOfWork.ResultRepository.GetResultsByUserIdAsync(user.Id);
            return Ok(results.Select(r => r.ToDto()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetResultById([FromRoute] string id)
        {
            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _unitOfWork.ResultRepository.GetResultByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result.ToDto());
        }

        [HttpPost]
        public async Task<IActionResult> SubmitQuiz([FromBody] CreateResultRequestDto createResultRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized();
            }

            var result = createResultRequestDto.ToModel();
            result.AppUserId = user.Id;
            var submittedResult = await _unitOfWork.ResultRepository.SubmitQuizAsync(result);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(GetResultById), new { id = submittedResult.Id }, submittedResult.ToDto());
        }
    }
}