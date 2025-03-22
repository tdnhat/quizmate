using Microsoft.AspNetCore.SignalR;
using QuizMate.Api.Hubs;
using QuizMate.Api.Interfaces;
using QuizMate.Api.Models;

namespace QuizMate.Api.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationService(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task NotifyResultSubmission(Result result, string quizTitle)
        {
            // Notify quiz creator
            await SendUserNotification(result.Quiz.AppUserId, $"New result submitted for {quizTitle}", "QuizCompleted");

            // Notify quiz taker
            await SendUserNotification(result.AppUserId, $"You have completed the quiz {quizTitle}", "ResultSubmitted");
        }

        public async Task SendUserNotification(string userId, string message, string type)
        {
            var notification = new
            {
                Type = type,
                Message = message,
                Timestamp = DateTime.UtcNow
            };

            await _hubContext.Clients.Group(userId).SendAsync("ReceiveNotification", notification);
        }

    }
}