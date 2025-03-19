namespace QuizMate.Api.Models
{
    public class SavedQuiz
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public string QuizId { get; set; }

        public AppUser AppUser { get; set; }
        public Quiz Quiz { get; set; }
    }
}