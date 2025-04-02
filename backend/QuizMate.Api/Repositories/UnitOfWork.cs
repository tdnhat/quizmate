using QuizMate.Api.Data;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Services;
using Microsoft.AspNetCore.Identity;
using QuizMate.Api.Models;
namespace QuizMate.Api.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        public IQuizRepository QuizRepository { get; private set; }
        public IQuestionRepository QuestionRepository { get; private set; }
        public IAnswerRepository AnswerRepository { get; private set; }
        public IResultRepository ResultRepository { get; private set; }
        public ICategoryRepository CategoryRepository { get; private set; }

        public IQuizSessionRepository QuizSessionRepository { get; private set; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            QuizRepository = new QuizRepository(context);
            QuestionRepository = new QuestionRepository(context);
            AnswerRepository = new AnswerRepository(context);
            ResultRepository = new ResultRepository(context);
            CategoryRepository = new CategoryRepository(context);
            QuizSessionRepository = new QuizSessionRepository(context);
        }
        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}