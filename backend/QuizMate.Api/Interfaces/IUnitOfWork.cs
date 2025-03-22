namespace QuizMate.Api.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IQuizRepository QuizRepository { get; }
        IQuestionRepository QuestionRepository { get; }
        IAnswerRepository AnswerRepository { get; }
        IResultRepository ResultRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        Task<bool> SaveAsync();
    }
}