using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser appUser);
    }
}