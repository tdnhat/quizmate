using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Data;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Repositories
{
    public class QuizSessionRepository : IQuizSessionRepository
    {
        private readonly ApplicationDbContext _context;

        public QuizSessionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<QuizSessionParticipant> AddOrUpdateParticipantAsync(string sessionId, string userId, string connectionId)
        {
            var participant = await _context.QuizSessionParticipants
                .FirstOrDefaultAsync(p => p.QuizSessionId == sessionId && p.UserId == userId);
            
            if (participant == null)
            {
                participant = new QuizSessionParticipant
                {
                    QuizSessionId = sessionId,
                    UserId = userId,
                    ConnectionId = connectionId,
                    JoinedAt = DateTime.UtcNow
                };
                await _context.QuizSessionParticipants.AddAsync(participant);
            }
            else
            {
                participant.ConnectionId = connectionId;
                participant.JoinedAt = DateTime.UtcNow;
            }
            await _context.SaveChangesAsync();
            return participant;
        }

        public async Task<QuizSession> CreateSessionAsync(string quizId, string hostId)
        {
            var session = new QuizSession
            {
                QuizId = quizId,
                HostId = hostId,
                Status = "Waiting",
                CreatedAt = DateTime.UtcNow
            };
            await _context.QuizSessions.AddAsync(session);
            await _context.SaveChangesAsync();
            return session;
        }

        public async Task<bool> EndSessionAsync(string sessionId)
        {
            var session = await _context.QuizSessions.FindAsync(sessionId);
            if (session == null)
            {
                throw new Exception("Session not found");
            }
            session.EndedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<QuizSessionParticipant> GetParticipantAsync(string sessionId, string userId)
        {
            var participant = await _context.QuizSessionParticipants
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.QuizSessionId == sessionId && p.UserId == userId);

            if (participant == null)
            {
                throw new Exception("Participant not found");
            }
            return participant;
        }

        public async Task<QuizSessionParticipant> GetParticipantByConnectionIdAsync(string connectionId)
        {
            var participant = await _context.QuizSessionParticipants
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.ConnectionId == connectionId);
            
            if (participant == null)
            {
                throw new Exception("Participant not found");
            }
            return participant;
        }

        public async Task<QuizSession> GetSessionByIdAsync(string sessionId)
        {
            var session = await _context.QuizSessions
                .Include(s => s.Quiz)
                    .ThenInclude(q => q.Questions)
                        .ThenInclude(q => q.Answers)
                .Include(s => s.Participants)
                    .ThenInclude(p => p.User)
                .FirstOrDefaultAsync(s => s.Id == sessionId);

            return session;
        }

        public async Task<QuizSession> GetSessionByJoinCodeAsync(string joinCode)
        {
            var session = await _context.QuizSessions
                .Include(s => s.Quiz)
                .Include(s => s.Host)
                .FirstOrDefaultAsync(s => s.JoinCode == joinCode);
            if (session == null)
            {
                throw new Exception("Session not found");
            }
            return session;
        }

        public async Task<object> GetSessionResultsAsync(string sessionId)
        {
            var session = await _context.QuizSessions.FindAsync(sessionId);
            if (session == null)
            {
                throw new Exception("Session not found");
            }
            return session;
        }

        public async Task<IEnumerable<QuizSession>> GetSessionsByHostIdAsync(string hostId)
        {
            var sessions = await _context.QuizSessions.Where(s => s.HostId == hostId).ToListAsync();
            if (sessions == null)
            {
                throw new Exception("Sessions not found");
            }
            return sessions;
        }

        public async Task RecordAnswerAsync(string sessionId, string participantId, string questionId, string answerId, bool isCorrect, int pointsEarned, int timeTaken)
        {
            var answer = new QuizSessionAnswer
            {
                QuizSessionId = sessionId,
                ParticipantId = participantId,
                QuestionId = questionId,
                AnswerId = answerId,
                IsCorrect = isCorrect,
                PointsEarned = pointsEarned,
                TimeTaken = TimeSpan.FromSeconds(timeTaken)
            };
            await _context.QuizSessionAnswers.AddAsync(answer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateParticipantConnectionStatusAsync(string userId, string connectionId, bool isActive)
        {
            var participant = await _context.QuizSessionParticipants
                .FirstOrDefaultAsync(p => p.UserId == userId && p.ConnectionId == connectionId);
            
            if (participant == null)
            {
                throw new Exception("Participant not found");
            }
            participant.IsActive = isActive;
            await _context.SaveChangesAsync();
        }

        public async Task<QuizSession> JoinSessionAsync(string sessionId, string userId, string connectionId = null)
        {
            var session = await _context.QuizSessions
                .Include(s => s.Quiz)
                .Include(s => s.Participants)
                    .ThenInclude(p => p.User)
                .FirstOrDefaultAsync(s => s.Id == sessionId);

            if (session == null)
            {
                throw new Exception("Session not found");
            }

            if (session.Status != "Waiting" && session.Status != "Active")
            {
                throw new Exception("Session is not accepting participants");
            }

            var participant = await _context.QuizSessionParticipants
                .FirstOrDefaultAsync(p => p.QuizSessionId == sessionId && p.UserId == userId);

            if (participant != null)
            {
                if (participant.IsActive)
                {
                    throw new Exception("Participant already active in this session");
                }

                // Reactivate participant
                participant.IsActive = true;
                participant.ConnectionId = connectionId;
                participant.JoinedAt = DateTime.UtcNow;
                participant.LeftAt = null;
            }
            else
            {
                participant = new QuizSessionParticipant
                {
                    QuizSessionId = sessionId,
                    UserId = userId,
                    ConnectionId = connectionId,
                    JoinedAt = DateTime.UtcNow,
                    IsActive = true
                };
                await _context.QuizSessionParticipants.AddAsync(participant);
            }

            await _context.SaveChangesAsync();
            return session;
        }
    }
}