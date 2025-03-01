using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.Data;
using QuizMate.Api.DTOs.Question;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Mappers;
using QuizMate.Api.Models;

namespace QuizMate.Api.Controllers
{
    [ApiController]
    [Route("api/questions")]
    public class QuestionController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IQuestionRepository _questionRepo;
        public QuestionController(UserManager<AppUser> userManager, IQuestionRepository questionRepo)
        {
            _userManager = userManager;
            _questionRepo = questionRepo;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetQuestionById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var question = await _questionRepo.GetQuestionByIdAsync(id);

            if (question == null) return NotFound("Question not found");

            return Ok(question.ToQuestionDto());
        }

        [HttpGet("quiz/{quizId:int}")]
        public async Task<IActionResult> GetQuestionsByQuizId([FromRoute] int quizId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var questions = await _questionRepo.GetQuestionsByQuizIdAsync(quizId);

            if (questions == null || !questions.Any()) return NotFound("Questions not found");
            return Ok(questions.Select(q => q.ToQuestionDto()));
        }

        [HttpPost("{quizId:int}")]
        [Authorize]
        public async Task<IActionResult> CreateQuestion([FromRoute] int quizId, [FromBody] CreateQuestionRequestDto createQuestionRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null) return Unauthorized("User not found");

            var questionModel = createQuestionRequestDto.ToQuestionFromCreateDto(quizId);

            await _questionRepo.CreateQuestionAsync(questionModel);

            return CreatedAtAction(nameof(GetQuestionById), new { id = questionModel.Id }, questionModel.ToQuestionDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateQuestion([FromRoute] int id, [FromBody] UpdateQuestionRequestDto updateQuestionRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null) return Unauthorized("User not found");

            var existingQuestion = await _questionRepo.GetQuestionByIdAsync(id);
            if (existingQuestion == null) return NotFound("Question not found");

            var questionModel = updateQuestionRequestDto.ToQuestionFromUpdateDto(existingQuestion.QuizId);
            var updatedQuestion = await _questionRepo.UpdateQuestionAsync(id, questionModel);

            if (updatedQuestion == null) return NotFound();

            return Ok(updatedQuestion.ToQuestionDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var deletedQuestion = await _questionRepo.DeleteQuestionAsync(id);

            if (deletedQuestion == null) return NotFound("Question not found");

            return NoContent();
        }
    }
}