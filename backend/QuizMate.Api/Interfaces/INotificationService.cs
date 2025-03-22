using QuizMate.Api.Models;

namespace QuizMate.Api.Interfaces
{
    public interface INotificationService
    {
        Task NotifyResultSubmission(Result result, string quizTitle);
        Task SendUserNotification(string userId, string message, string type);
    }
}