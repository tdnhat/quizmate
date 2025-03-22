namespace QuizMate.Api.DTOs.Quiz
{
    public class QuizQueryObject
    {
        public string? Search { get; set; } // Search by title or description
        public string? CategoryId { get; set; } // Filter by category
        public bool? IsPublic { get; set; } // Filter by public/private
        public string? Difficulty { get; set; } // Filter by difficulty
        public int Page { get; set; } = 1; // Current page (default 1)
        public int PageSize { get; set; } = 10; // Number of items per page (default 10)
        public bool IsDescending { get; set; } = false; // Sort by field (default "createdAt")
        public string? SortBy { get; set; } = "createdAt"; // Sort order (default "desc")


    }
}