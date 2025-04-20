using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizMate.Api.Models;

namespace QuizMate.Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<ResultAnswer> ResultAnswers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SavedQuiz> SavedQuizzes { get; set; }
        public DbSet<QuizSession> QuizSessions { get; set; }
        public DbSet<QuizSessionParticipant> QuizSessionParticipants { get; set; }
        public DbSet<QuizSessionAnswer> QuizSessionAnswers { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Category>()
                .HasMany(c => c.Quizzes)
                .WithOne(q => q.Category)
                .HasForeignKey(q => q.CategoryId);

            builder.Entity<AppUser>()
                .HasMany(u => u.CreatedQuizzes)
                .WithOne(q => q.AppUser)
                .HasForeignKey(q => q.AppUserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Quiz>()
                .HasMany(u => u.Results)
                .WithOne(q => q.Quiz)
                .HasForeignKey(q => q.QuizId);

            builder.Entity<Quiz>()
                .HasMany(u => u.Questions)
                .WithOne(q => q.Quiz)
                .HasForeignKey(q => q.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Question>()
                .HasMany(u => u.Answers)
                .WithOne(q => q.Question)
                .HasForeignKey(q => q.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUser>()
                .HasMany(u => u.QuizResults)
                .WithOne(q => q.AppUser)
                .HasForeignKey(q => q.AppUserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<ResultAnswer>()
                .HasOne(r => r.Result)
                .WithMany(r => r.ResultAnswers)
                .HasForeignKey(r => r.ResultId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<ResultAnswer>()
                .HasOne(r => r.Question)
                .WithMany()
                .HasForeignKey(r => r.QuestionId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<ResultAnswer>()
                .HasOne(r => r.Answer)
                .WithMany()
                .HasForeignKey(r => r.AnswerId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<SavedQuiz>()
                .HasOne(sq => sq.AppUser)
                .WithMany(u => u.SavedQuizzes)
                .HasForeignKey(sq => sq.AppUserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<SavedQuiz>()
                .HasOne(sq => sq.Quiz)
                .WithMany()
                .HasForeignKey(sq => sq.QuizId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Quiz>()
                .Property(q => q.Tags)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            // Quiz Session configurations
            builder.Entity<QuizSession>()
                .HasOne(qs => qs.Quiz)
                .WithMany()
                .HasForeignKey(qs => qs.QuizId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<QuizSession>()
                .HasOne(qs => qs.Host)
                .WithMany()
                .HasForeignKey(qs => qs.HostId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<QuizSession>()
                .HasMany(qs => qs.Participants)
                .WithOne(p => p.QuizSession)
                .HasForeignKey(p => p.QuizSessionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<QuizSession>()
                .Property(qs => qs.Status)
                .HasConversion<string>();

            // Quiz Session Participant configurations
            builder.Entity<QuizSessionParticipant>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<QuizSessionParticipant>()
                .HasIndex(p => p.ConnectionId)
                .IsUnique();

            // Quiz Session Answer configurations
            builder.Entity<QuizSessionAnswer>()
                .HasOne(a => a.Participant)
                .WithMany()
                .HasForeignKey(a => a.ParticipantId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<QuizSessionAnswer>()
                .HasOne(a => a.Question)
                .WithMany()
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<QuizSessionAnswer>()
                .HasOne(a => a.Answer)
                .WithMany()
                .HasForeignKey(a => a.AnswerId)
                .OnDelete(DeleteBehavior.NoAction);

            // Ensure unique join codes for active sessions
            builder.Entity<QuizSession>()
                .HasIndex(qs => qs.JoinCode)
                .IsUnique()
                .HasFilter("\"Status\" IN ('Waiting', 'Active')");

            // Seed categories data
            var categories = new List<Category>
            {
                // Academic categories
                new Category { Id = "programming", Name = "Programming", Slug = "programming", Description = "Quizzes about programming languages, concepts, and software development.", ColorPreset = "blue", CreatedAt = DateTime.UtcNow },
                new Category { Id = "computer_science", Name = "Computer Science", Slug = "computer-science", Description = "Theoretical computer science, algorithms, data structures, and computing concepts.", ColorPreset = "indigo", CreatedAt = DateTime.UtcNow },
                new Category { Id = "mathematics", Name = "Mathematics", Slug = "mathematics", Description = "Quizzes covering various mathematical concepts, from algebra to calculus.", ColorPreset = "teal", CreatedAt = DateTime.UtcNow },
                new Category { Id = "science", Name = "Science", Slug = "science", Description = "General science topics including physics, chemistry, and biology.", ColorPreset = "green", CreatedAt = DateTime.UtcNow },
                new Category { Id = "history", Name = "History", Slug = "history", Description = "Historical events, figures, and time periods from around the world.", ColorPreset = "orange", CreatedAt = DateTime.UtcNow },
                
                // Technology categories
                new Category { Id = "web_dev", Name = "Web Development", Slug = "web-dev", Description = "Frontend, backend, and full-stack web development topics.", ColorPreset = "sky", CreatedAt = DateTime.UtcNow },
                new Category { Id = "data_science", Name = "Data Science", Slug = "data-science", Description = "Data analysis, machine learning, and statistical methods.", ColorPreset = "purple", CreatedAt = DateTime.UtcNow },
                new Category { Id = "ai", Name = "Artificial Intelligence", Slug = "ai", Description = "AI concepts, machine learning, neural networks, and their applications.", ColorPreset = "violet", CreatedAt = DateTime.UtcNow },
                new Category { Id = "mobile_dev", Name = "Mobile Development", Slug = "mobile-dev", Description = "iOS, Android, and cross-platform mobile development.", ColorPreset = "emerald", CreatedAt = DateTime.UtcNow },
                new Category { Id = "cybersecurity", Name = "Cybersecurity", Slug = "cybersecurity", Description = "Computer security, network security, and ethical hacking.", ColorPreset = "red", CreatedAt = DateTime.UtcNow },
                
                // Business & Professional
                new Category { Id = "business", Name = "Business & Management", Slug = "business", Description = "Business concepts, management theories, and organizational behavior.", ColorPreset = "slate", CreatedAt = DateTime.UtcNow },
                new Category { Id = "finance", Name = "Finance", Slug = "finance", Description = "Personal finance, investing, accounting, and financial markets.", ColorPreset = "green", CreatedAt = DateTime.UtcNow },
                new Category { Id = "marketing", Name = "Marketing", Slug = "marketing", Description = "Marketing strategies, consumer behavior, and advertising techniques.", ColorPreset = "pink", CreatedAt = DateTime.UtcNow },
                new Category { Id = "entrepreneurship", Name = "Entrepreneurship", Slug = "entrepreneurship", Description = "Startup concepts, business models, and entrepreneurial mindset.", ColorPreset = "yellow", CreatedAt = DateTime.UtcNow },
                
                // Entertainment & Pop Culture
                new Category { Id = "movies_tv", Name = "Movies & TV", Slug = "movies", Description = "Film history, TV shows, actors, directors, and cinema trivia.", ColorPreset = "red", CreatedAt = DateTime.UtcNow },
                new Category { Id = "music", Name = "Music", Slug = "music", Description = "Musical genres, artists, bands, instruments, and music theory.", ColorPreset = "purple", CreatedAt = DateTime.UtcNow },
                new Category { Id = "gaming", Name = "Gaming", Slug = "gaming", Description = "Video games, gaming platforms, game development, and gaming culture.", ColorPreset = "lime", CreatedAt = DateTime.UtcNow },
                new Category { Id = "sports", Name = "Sports", Slug = "sports", Description = "Various sports, athletes, championships, and sporting events.", ColorPreset = "blue", CreatedAt = DateTime.UtcNow },
                
                // Miscellaneous
                new Category { Id = "general_knowledge", Name = "General Knowledge", Slug = "general-knowledge", Description = "Diverse topics testing overall knowledge and trivia.", ColorPreset = "teal", CreatedAt = DateTime.UtcNow },
                new Category { Id = "languages", Name = "Languages", Slug = "language", Description = "Vocabulary, grammar, and linguistic concepts from various languages.", ColorPreset = "indigo", CreatedAt = DateTime.UtcNow },
                new Category { Id = "geography", Name = "Geography", Slug = "geography", Description = "Countries, capitals, natural features, and global geography.", ColorPreset = "emerald", CreatedAt = DateTime.UtcNow },
                new Category { Id = "food_cooking", Name = "Food & Cooking", Slug = "food-cooking", Description = "Culinary arts, cuisine, ingredients, and cooking techniques.", ColorPreset = "orange", CreatedAt = DateTime.UtcNow },
                new Category { Id = "art_design", Name = "Art & Design", Slug = "art-design", Description = "Fine arts, design principles, art history, and creative techniques.", ColorPreset = "violet", CreatedAt = DateTime.UtcNow },
                new Category { Id = "literature", Name = "Literature", Slug = "literature", Description = "Books, authors, literary genres, and famous works.", ColorPreset = "yellow", CreatedAt = DateTime.UtcNow }
            };

            builder.Entity<Category>().HasData(categories);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}