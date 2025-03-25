using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.DTOs.Account;
using QuizMate.Api.DTOs.Account.Register;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManger;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService,
        SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManger = signInManager;
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized();
            }

            // Get user roles
            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault() ?? "User";

            return Ok(new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                AvatarUrl = user.AvatarUrl,
                Role = userRole,
                CreatedAt = user.CreatedAt,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appUser = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                DisplayName = registerDto.Username,
                AvatarUrl = "https://ui-avatars.com/api/?name=" + registerDto.Username,
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

            try
            {
                if (createdUser.Succeeded)
                {
                    const string defaultRole = "User";

                    var roleResult = await _userManager.AddToRoleAsync(appUser, defaultRole);
                    if (roleResult.Succeeded)
                    {
                        return Ok(new NewUserDto
                        {
                            Username = appUser.UserName,
                            Email = appUser.Email,
                            Token = _tokenService.CreateToken(appUser)
                        });
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            var result = await _signInManger.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid credentials");
            }

            // Get user roles
            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault() ?? "User";

            return Ok(new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                AvatarUrl = user.AvatarUrl,
                Role = userRole,
                CreatedAt = user.CreatedAt,
                Token = _tokenService.CreateToken(user)
            });
        }
    }
}