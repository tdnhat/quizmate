using QuizMate.Api.DTOs.QuizSession;
using QuizMate.Api.DTOs.QuizSessionParticipant;
using QuizMate.Api.Models;

namespace QuizMate.Api.Mappers
{
    public static class QuizSessionMappers
    {
        public static QuizSessionDto ToDto(this QuizSession session)
        {
            return new QuizSessionDto
            {
                Id = session.Id,
                QuizId = session.QuizId,
                QuizTitle = session.Quiz?.Title,
                HostId = session.HostId,
                HostName = session.Host?.UserName,
                JoinCode = session.JoinCode,
                Status = session.Status,
                CreatedAt = session.CreatedAt,
                StartedAt = session.StartedAt,
                EndedAt = session.EndedAt,
                CurrentQuestionIndex = session.CurrentQuestionIndex,
                Participants = session.Participants?
                    .Select(p => p.ToDto())
                    .ToList() ?? new List<QuizSessionParticipantDto>()
            };
        }

        public static QuizSessionParticipantDto ToDto(this QuizSessionParticipant participant)
        {
            return new QuizSessionParticipantDto
            {
                Id = participant.Id,
                UserId = participant.UserId,
                UserName = participant.User?.UserName,
                Score = participant.Score,
                IsActive = participant.IsActive,
                JoinedAt = participant.JoinedAt,
                LeftAt = participant.LeftAt
            };
        }

        public static QuizSessionAnswerDto ToDto(this QuizSessionAnswer answer)
        {
            return new QuizSessionAnswerDto
            {
                Id = answer.Id,
                ParticipantId = answer.ParticipantId,
                ParticipantName = answer.Participant?.User?.UserName,
                QuestionId = answer.QuestionId,
                QuestionText = answer.Question?.Text,
                AnswerId = answer.AnswerId,
                AnswerText = answer.Answer?.Text,
                IsCorrect = answer.IsCorrect,
                PointsEarned = answer.PointsEarned,
                SubmittedAt = answer.SubmittedAt,
                TimeTaken = answer.TimeTaken
            };
        }
    }
}