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