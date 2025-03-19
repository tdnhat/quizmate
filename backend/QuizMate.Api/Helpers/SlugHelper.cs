using System.Text.RegularExpressions;

namespace QuizMate.Api.Helpers
{
    public static class SlugHelper
    {
        public static string GenerateSlug(string title, string id)
        {
            string slug = title.ToLower().Trim().Replace(" ", "-");

            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", string.Empty); // Remove special characters

            slug = slug.Substring(0, slug.Length <= 100 ? slug.Length : 100)
                .Trim(); // Limit length

            return $"{slug}-{id}";
        }
    }
}