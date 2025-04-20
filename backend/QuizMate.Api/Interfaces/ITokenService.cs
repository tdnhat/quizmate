using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}