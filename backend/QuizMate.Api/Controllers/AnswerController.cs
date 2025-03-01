using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using QuizMate.Api.DTOs.Answer;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Mappers;
using QuizMate.Api.Models;

namespace QuizMate.Api.Controllers
{
    [ApiController]
    [Route("api/answers")]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerRepository _answerRepo;
        private readonly UserManager<AppUser> _userManager;
        public AnswerController(IAnswerRepository answerRepo, UserManager<AppUser> userManager)
        {
            _answerRepo = answerRepo;
            _userManager = userManager;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAnswerById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var answer = await _answerRepo.GetAnswerByIdAsync(id);

            if (answer == null) return NotFound("Answer not found");

            return Ok(answer.ToAnswerDto());
        }

        [HttpGet("question/{questionId:int}")]
        public async Task<IActionResult> GetAnswersByQuestionId([FromRoute] int questionId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var answers = await _answerRepo.GetAnswersByQuestionIdAsync(questionId);

            if (answers == null) return NotFound("Answers not found");

            return Ok(answers.Select(a => a.ToAnswerDto()));
        }

        [HttpPost("{questionId:int}")]
        [Authorize]
        public async Task<IActionResult> CreateAnswer([FromRoute] int questionId, [FromBody] CreateAnswerRequestDto createAnswerRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null) return Unauthorized("User not found");

            var answerModel = createAnswerRequestDto.ToAnswerFromCreateDto(questionId);

            await _answerRepo.CreateAnswerAsync(answerModel);

            return CreatedAtAction(nameof(GetAnswerById), new { id = answerModel.Id }, answerModel.ToAnswerDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateAnswer([FromRoute] int id, [FromBody] UpdateAnswerRequestDto updateAnswerRequestDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null) return Unauthorized();

            var existingAnswer = await _answerRepo.GetAnswerByIdAsync(id);

            if (existingAnswer == null) return NotFound("Answer not found");

            var answerModel = updateAnswerRequestDto.ToAnswerFromUpdateDto(existingAnswer.QuestionId);
            var updatedModel = await _answerRepo.UpdateAnswerAsync(id, answerModel);

            if (updatedModel == null) return NotFound();

            return Ok(updatedModel.ToAnswerDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteAnswer([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var deletedAnswer = await _answerRepo.DeleteAnswerAsync(id);

            if (deletedAnswer == null) return NotFound("Answer not found");

            return NoContent();
        }
    }
}