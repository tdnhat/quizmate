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
                .HasFilter("[Status] IN ('Waiting', 'Active')");


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