using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using QuizMate.Api.Interfaces;

namespace QuizMate.Api.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;
        private const string QUIZ_THUMBNAILS_FOLDER = "quizmate/thumbnails";
        private const string USER_AVATARS_FOLDER = "quizmate/avatars";
        private const string QUESTION_IMAGES_FOLDER = "quizmate/questions";

        public CloudinaryService(IConfiguration configuration)
        {
            var cloudName = configuration["Cloudinary:CloudName"];
            var apiKey = configuration["Cloudinary:ApiKey"];
            var apiSecret = configuration["Cloudinary:ApiSecret"];

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<string> UploadQuizThumbnailAsync(IFormFile file)
        {
            return await UploadImageAsync(file, QUIZ_THUMBNAILS_FOLDER);
        }

        public async Task<string> UploadUserAvatarAsync(IFormFile file)
        {
            return await UploadImageAsync(file, USER_AVATARS_FOLDER);
        }

        public async Task<string> UploadQuestionImageAsync(IFormFile file)
        {
            return await UploadImageAsync(file, QUESTION_IMAGES_FOLDER);
        }

        private async Task<string> UploadImageAsync(IFormFile file, string folder)
        {
            if (file == null || file.Length == 0)
                return null;

            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = folder,
                UseFilename = true,
                UniqueFilename = true,
                Transformation = new Transformation()
                    .Quality("auto")
                    .FetchFormat("auto")
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.ToString();
        }

        private async Task<string> DestroyImageAsync(string publicId)
        {
            var destroyParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(destroyParams);
            return result.Result;
        }

        public async Task<string> DestroyThumbnailAsync(string publicId)
        {
            return await DestroyImageAsync($"{QUIZ_THUMBNAILS_FOLDER}/{publicId}");
        }

        public async Task<string> DestroyAvatarAsync(string publicId)
        {
            return await DestroyImageAsync($"{USER_AVATARS_FOLDER}/{publicId}");
        }

        public async Task<string> DestroyQuestionImageAsync(string publicId)
        {
            return await DestroyImageAsync($"{QUESTION_IMAGES_FOLDER}/{publicId}");
        }

    }
}