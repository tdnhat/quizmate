using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.DTOs.QuizSession;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QuizMate.Api.Controllers
{
    [Route("api/quiz-sessions")]
    [ApiController]
    [Authorize]
    public class QuizSessionController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public QuizSessionController(IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuizSession([FromBody] CreateQuizSessionRequestDto createQuizSessionDto)
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

            var quiz = await _unitOfWork.QuizRepository.GetQuizByIdAsync(createQuizSessionDto.QuizId);
            if (quiz == null)
            {
                return NotFound("Quiz not found");
            }

            var session = await _unitOfWork.QuizSessionRepository.CreateSessionAsync(createQuizSessionDto.QuizId, user.Id);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(GetSessionById), new { id = session.Id }, new
            {
                id = session.Id,
                quizId = session.QuizId,
                quizTitle = quiz.Title,
                hostId = session.HostId,
                hostName = user.UserName,
                joinCode = session.JoinCode,
                status = session.Status,
                createdAt = session.CreatedAt
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSessionById([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var session = await _unitOfWork.QuizSessionRepository.GetSessionByIdAsync(id);
            if (session == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                id = session.Id,
                quizId = session.QuizId,
                quizTitle = session.Quiz.Title,
                hostId = session.HostId,
                hostName = session.Host.UserName,
                joinCode = session.JoinCode,
                status = session.Status,
                createdAt = session.CreatedAt,
                startedAt = session.StartedAt,
                endedAt = session.EndedAt,
                currentQuestionIndex = session.CurrentQuestionIndex,
                participants = session.Participants.Where(p => p.IsActive).Select(p => new
                {
                    userId = p.UserId,
                    username = p.User.UserName,
                    score = p.Score,
                    joinedAt = p.JoinedAt
                })
            });
        }

        [HttpGet("join/{joinCode}")]
        public async Task<IActionResult> GetSessionByJoinCode([FromRoute] string joinCode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var session = await _unitOfWork.QuizSessionRepository.GetSessionByJoinCodeAsync(joinCode);
            if (session == null)
            {
                return NotFound();
            }

            if (session.Status != "Waiting" && session.Status != "Active")
            {
                return BadRequest("This session is no longer accepting participants");
            }

            return Ok(new
            {
                id = session.Id,
                quizId = session.QuizId,
                quizTitle = session.Quiz.Title,
                hostId = session.HostId,
                hostName = session.Host.UserName,
                status = session.Status
            });
        }

        [HttpGet("my-sessions")]
        public async Task<IActionResult> GetMyHostedSessions()
        {
            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var sessions = await _unitOfWork.QuizSessionRepository.GetSessionsByHostIdAsync(user.Id);

            return Ok(sessions.Select(s => new
            {
                id = s.Id,
                quizId = s.QuizId,
                quizTitle = s.Quiz.Title,
                joinCode = s.JoinCode,
                status = s.Status,
                createdAt = s.CreatedAt,
                startedAt = s.StartedAt,
                endedAt = s.EndedAt,
                participantCount = s.Participants.Count(p => p.IsActive)
            }));
        }

        [HttpGet("{id}/results")]
        public async Task<IActionResult> GetSessionResults([FromRoute] string id)
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

            var session = await _unitOfWork.QuizSessionRepository.GetSessionByIdAsync(id);
            if (session == null)
            {
                return NotFound();
            }

            // Only host or participants can view results
            if (session.HostId != user.Id && !session.Participants.Any(p => p.UserId == user.Id))
            {
                return Forbid();
            }

            var results = await _unitOfWork.QuizSessionRepository.GetSessionResultsAsync(id);
            return Ok(results);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EndSession([FromRoute] string id)
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

            var session = await _unitOfWork.QuizSessionRepository.GetSessionByIdAsync(id);
            if (session == null)
            {
                return NotFound();
            }

            if (session.HostId != user.Id)
            {
                return Forbid();
            }

            var success = await _unitOfWork.QuizSessionRepository.EndSessionAsync(id);
            if (!success)
            {
                return BadRequest("Failed to end session");
            }

            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
