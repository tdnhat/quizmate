using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Quic;
using System.Security.AccessControl;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using QuizMate.Api.DTOs.Quiz;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Mappers;
using QuizMate.Api.Models;

namespace QuizMate.Api.Controllers
{
    [ApiController]
    [Route("api/quizzes")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizRepository _quizRepo;
        private readonly UserManager<AppUser> _userManager;
        public QuizController(IQuizRepository quizRepo, UserManager<AppUser> userManager)
        {
            _quizRepo = quizRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllQuizzes()
        {
            var quizzes = await _quizRepo.GetAllQuizzesAsync();
            var quizDto = quizzes.Select(q => q.ToQuizDto());
            return Ok(quizDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetQuizById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var quiz = await _quizRepo.GetQuizByIdAsync(id);

            if (quiz == null) return NotFound();

            var quizDetailDto = quiz.ToQuizDetailsDto();
            Console.WriteLine(quizDetailDto);
            return Ok(quizDetailDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateQuiz([FromBody] CreateQuizRequestDto createQuizRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null) return Unauthorized("User not found");

            var quizModel = createQuizRequestDto.ToQuizFromCreateDto();
            quizModel.AppUserId = appUser.Id;
            await _quizRepo.CreateQuizAsync(quizModel);
            return CreatedAtAction(nameof(GetQuizById), new { id = quizModel.Id }, quizModel.ToQuizDetailsDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateQuiz([FromRoute] int id, [FromBody] UpdateQuizRequestDto updateQuizRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updatedQuiz = await _quizRepo.UpdateQuizAsync(id, updateQuizRequestDto.ToQuizFromUpdateDto());

            if (updatedQuiz == null) return NotFound();

            return Ok(updatedQuiz.ToQuizDetailsDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteQuiz([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var deletedQuiz = await _quizRepo.DeleteQuizAsync(id);

            if (deletedQuiz == null) return NotFound("Quiz not found");

            return NoContent();
        }
    }
}