using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.DTOs.Account;
using QuizMate.Api.DTOs.Account.Register;
using QuizMate.Api.Extensions;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using QuizMate.Api.Mappers;

namespace QuizMate.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManger;
        private readonly ICloudinaryService _cloudinaryService;

        public AccountController(
            UserManager<AppUser> userManager, 
            ITokenService tokenService,
            SignInManager<AppUser> signInManager,
            ICloudinaryService cloudinaryService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManger = signInManager;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet("me")]
        [Authorize]
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

            return Ok(user.ToUserDto(_tokenService.CreateToken(user), userRole));
        }

        [HttpPut("update-profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get current user
            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized();
            }

            // Only check for conflicts if the field is being updated
            // Check for existing username conflicts
            if (!string.IsNullOrWhiteSpace(updateDto.UserName) && updateDto.UserName != user.UserName)
            {
                var existingUserWithUsername = await _userManager.FindByNameAsync(updateDto.UserName);
                if (existingUserWithUsername != null)
                {
                    ModelState.AddModelError("UserName", "Username is already taken");
                    return BadRequest(ModelState);
                }
            }

            // Check for existing email conflicts
            if (!string.IsNullOrWhiteSpace(updateDto.Email) && updateDto.Email != user.Email)
            {
                var existingUserWithEmail = await _userManager.FindByEmailAsync(updateDto.Email);
                if (existingUserWithEmail != null)
                {
                    ModelState.AddModelError("Email", "Email is already registered");
                    return BadRequest(ModelState);
                }
            }

            // Update user properties from DTO
            user.UpdateFromDto(updateDto);

            // If username was changed and using default avatar, update the avatar URL too
            if (!string.IsNullOrWhiteSpace(updateDto.UserName) && 
                updateDto.UserName != user.UserName && 
                !string.IsNullOrEmpty(user.AvatarUrl) && 
                user.AvatarUrl.StartsWith("https://ui-avatars.com"))
            {
                // Update the avatar URL with the new username
                user.AvatarUrl = $"https://ui-avatars.com/api/?name={Uri.EscapeDataString(updateDto.UserName)}";
            }

            // Save changes
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // Get user roles
            var roles = await _userManager.GetRolesAsync(user);
            var userRole = roles.FirstOrDefault() ?? "User";

            // Return updated user data
            return Ok(user.ToUserDto(_tokenService.CreateToken(user), userRole));
        }

        [HttpPost("upload-avatar")]
        [Authorize]
        public async Task<IActionResult> UploadAvatar(IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var avatarUrl = await _cloudinaryService.UploadUserAvatarAsync(file);
            
            // Update user's avatar URL in the database
            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized();
            }

            // If user already has an avatar, delete the old one
            if (!string.IsNullOrEmpty(user.AvatarUrl) && !user.AvatarUrl.StartsWith("https://ui-avatars.com"))
            {
                try
                {
                    var publicId = user.AvatarUrl.Split('/').Last().Split('.')[0];
                    await _cloudinaryService.DestroyAvatarAsync(publicId);
                }
                catch (Exception)
                {
                    // Ignore errors when trying to delete old avatar
                }
            }

            user.AvatarUrl = avatarUrl;
            await _userManager.UpdateAsync(user);

            return Ok(new { AvatarUrl = avatarUrl });
        }

        [HttpDelete("destroy-avatar")]
        [Authorize]
        public async Task<IActionResult> DestroyAvatar()
        {
            var userEmail = User.GetEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized();
            }

            if (string.IsNullOrEmpty(user.AvatarUrl) || user.AvatarUrl.StartsWith("https://ui-avatars.com"))
            {
                return BadRequest("No custom avatar to delete");
            }

            try
            {
                var publicId = user.AvatarUrl.Split('/').Last().Split('.')[0];
                await _cloudinaryService.DestroyAvatarAsync(publicId);
                
                // Reset to default avatar
                user.AvatarUrl = "https://ui-avatars.com/api/?name=" + user.UserName;
                await _userManager.UpdateAsync(user);
                
                return Ok(new { AvatarUrl = user.AvatarUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting avatar: {ex.Message}");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if email already exists
            var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                return BadRequest(new { error = "Email is already registered" });
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

            return Ok(user.ToUserDto(_tokenService.CreateToken(user), userRole));
        }
    }
}