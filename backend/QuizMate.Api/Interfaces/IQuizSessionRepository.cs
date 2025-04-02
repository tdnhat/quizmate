using System.Collections.Generic;
using System.Threading.Tasks;
using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface IQuizSessionRepository
    {
        Task<QuizSession> CreateSessionAsync(string quizId, string hostId);
        Task<QuizSession> GetSessionByIdAsync(string sessionId);
        Task<QuizSession> GetSessionByJoinCodeAsync(string joinCode);
        Task<IEnumerable<QuizSession>> GetSessionsByHostIdAsync(string hostId);
        Task<QuizSessionParticipant> AddOrUpdateParticipantAsync(string sessionId, string userId, string connectionId);
        Task<QuizSessionParticipant> GetParticipantAsync(string sessionId, string userId);
        Task<QuizSessionParticipant> GetParticipantByConnectionIdAsync(string connectionId);
        Task UpdateParticipantConnectionStatusAsync(string userId, string connectionId, bool isActive);
        Task RecordAnswerAsync(string sessionId, string participantId, string questionId, string answerId, bool isCorrect, int pointsEarned);
        Task<object> GetSessionResultsAsync(string sessionId);
        Task<bool> EndSessionAsync(string sessionId);
        Task<QuizSession> JoinSessionAsync(string sessionId, string userId, string connectionId = null);
    }
}