namespace QuizMate.Api.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IQuizRepository QuizRepository { get; }
        IQuestionRepository QuestionRepository { get; }
        IAnswerRepository AnswerRepository { get; }
        IResultRepository ResultRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IQuizSessionRepository QuizSessionRepository { get; }
        ISavedQuizRepository SavedQuizRepository { get; }
        Task<bool> SaveAsync();
    }
}