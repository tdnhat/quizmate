namespace QuizMate.Api.Models
{
    public class SavedQuiz
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string AppUserId { get; set; }
        public string QuizId { get; set; }

        public AppUser AppUser { get; set; }
        public Quiz Quiz { get; set; }
    }
}