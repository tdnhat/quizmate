using Microsoft.AspNetCore.Http;
namespace QuizMate.Api.Interfaces
{
    public interface ICloudinaryService
    {
        Task<string> UploadQuizThumbnailAsync(IFormFile file);
        Task<string> UploadUserAvatarAsync(IFormFile file);
        Task<string> UploadQuestionImageAsync(IFormFile file);
        Task<string> DestroyThumbnailAsync(string publicId);
        Task<string> DestroyAvatarAsync(string publicId);
        Task<string> DestroyQuestionImageAsync(string publicId);
    }
}