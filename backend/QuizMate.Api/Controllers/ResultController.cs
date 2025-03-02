using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    [ApiController]
    [Route("api/results")]
    public class ResultController : ControllerBase
    {
        private readonly IResultRepository _resultRepo;
        private readonly UserManager<AppUser> _userManager;
        public ResultController(IResultRepository resultRepo, UserManager<AppUser> userManager)
        {
            _resultRepo = resultRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllResult()
        {
            var results = await _resultRepo.GetAllResultsAsync();

            if (results == null) return NotFound();

            var resultsDto = results.Select(r => r.ToResultDto());

            return Ok(resultsDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetResultById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _resultRepo.GetResultByIdAsync(id);

            if (result == null) return NotFound();

            var resultDetailsDto = result.ToResultDetailsDto();

            return Ok(resultDetailsDto);
        }

        [HttpGet("quiz/{quizId:int}")]
        public async Task<IActionResult> GetResultsByQuizId([FromRoute] int quizId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var results = await _resultRepo.GetResultsByQuizIdAsync(quizId);

            if (results == null) return NotFound();

            var resultsDto = results.Select(r => r.ToResultDto());

            return Ok(resultsDto);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetResultsByUserId([FromRoute] string userId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var results = await _resultRepo.GetResultsByUserIdAsync(userId);

            if (results == null) return NotFound();

            var resultsDto = results.Select(r => r.ToResultDto());

            return Ok(resultsDto);
        }

        [HttpPost("{quizId:int}")]
        [Authorize]
        public async Task<IActionResult> CreateResult([FromRoute] int quizId, [FromBody] CreateResultRequestDto createResultRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null) return Unauthorized();

            var resultModel = createResultRequestDto.ToResultFromCreateDto();
            resultModel.AppUserId = appUser.Id;
            resultModel.QuizId = quizId;
            await _resultRepo.CreateResultAsync(quizId, resultModel);

            return CreatedAtAction(nameof(GetResultById), new { id = resultModel.Id }, resultModel.ToResultDetailsDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteResult([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null) return Unauthorized();

            var resultToDelete = await _resultRepo.GetResultByIdAsync(id);

            if (resultToDelete == null) return NotFound("Result not found");

            if (resultToDelete.AppUserId != appUser.Id && !User.IsInRole("Admin"))
            {
                return Forbid("You don't have permission to delete this result");
            }

            var deletedResult = await _resultRepo.DeleteResultAsync(id);

            if (deletedResult == null) return StatusCode(500, "Result could not be deleted");

            return NoContent();
        }
    }
}