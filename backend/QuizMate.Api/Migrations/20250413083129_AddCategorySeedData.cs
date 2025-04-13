using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCategorySeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38dc3480-6414-4f43-a530-d8d9ef18aee6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6c717f26-127f-4fe7-b948-765a88276af0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c7a63d51-0344-4e9c-8ac2-d6054527a94e", null, "Admin", "ADMIN" },
                    { "d489a400-69e4-4de5-aa01-270b590fefcd", null, "User", "USER" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ColorPreset", "CreatedAt", "Description", "Image", "IsFeatured", "Name", "QuizCount", "Slug" },
                values: new object[,]
                {
                    { "ai", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6572), "AI concepts, machine learning, neural networks, and their applications.", null, false, "Artificial Intelligence", 0, "ai" },
                    { "art-design", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6705), "Fine arts, design principles, art history, and creative techniques.", null, false, "Art & Design", 0, "art-design" },
                    { "business", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6597), "Business concepts, management theories, and organizational behavior.", null, false, "Business & Management", 0, "business" },
                    { "computer-science", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6528), "Theoretical computer science, algorithms, data structures, and computing concepts.", null, false, "Computer Science", 0, "computer-science" },
                    { "cybersecurity", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6590), "Computer security, network security, and ethical hacking.", null, false, "Cybersecurity", 0, "cybersecurity" },
                    { "data-science", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6565), "Data analysis, machine learning, and statistical methods.", null, false, "Data Science", 0, "data-science" },
                    { "entrepreneurship", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6617), "Startup concepts, business models, and entrepreneurial mindset.", null, false, "Entrepreneurship", 0, "entrepreneurship" },
                    { "finance", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6603), "Personal finance, investing, accounting, and financial markets.", null, false, "Finance", 0, "finance" },
                    { "food-cooking", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6699), "Culinary arts, cuisine, ingredients, and cooking techniques.", null, false, "Food & Cooking", 0, "food-cooking" },
                    { "gaming", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6635), "Video games, gaming platforms, game development, and gaming culture.", null, false, "Gaming", 0, "gaming" },
                    { "general-knowledge", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6680), "Diverse topics testing overall knowledge and trivia.", null, false, "General Knowledge", 0, "general-knowledge" },
                    { "geography", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6693), "Countries, capitals, natural features, and global geography.", null, false, "Geography", 0, "geography" },
                    { "history", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6548), "Historical events, figures, and time periods from around the world.", null, false, "History", 0, "history" },
                    { "language", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6687), "Vocabulary, grammar, and linguistic concepts from various languages.", null, false, "Languages", 0, "language" },
                    { "literature", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6711), "Books, authors, literary genres, and famous works.", null, false, "Literature", 0, "literature" },
                    { "marketing", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6611), "Marketing strategies, consumer behavior, and advertising techniques.", null, false, "Marketing", 0, "marketing" },
                    { "mathematics", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6535), "Quizzes covering various mathematical concepts, from algebra to calculus.", null, false, "Mathematics", 0, "mathematics" },
                    { "mobile-dev", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6581), "iOS, Android, and cross-platform mobile development.", null, false, "Mobile Development", 0, "mobile-dev" },
                    { "movies", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6623), "Film history, TV shows, actors, directors, and cinema trivia.", null, false, "Movies & TV", 0, "movies" },
                    { "music", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6627), "Musical genres, artists, bands, instruments, and music theory.", null, false, "Music", 0, "music" },
                    { "programming", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6520), "Quizzes about programming languages, concepts, and software development.", null, false, "Programming", 0, "programming" },
                    { "science", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6541), "General science topics including physics, chemistry, and biology.", null, false, "Science", 0, "science" },
                    { "sports", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6643), "Various sports, athletes, championships, and sporting events.", null, false, "Sports", 0, "sports" },
                    { "web-dev", "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6557), "Frontend, backend, and full-stack web development topics.", null, false, "Web Development", 0, "web-dev" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7a63d51-0344-4e9c-8ac2-d6054527a94e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d489a400-69e4-4de5-aa01-270b590fefcd");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "ai");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "art-design");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "business");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "computer-science");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "cybersecurity");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "data-science");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "entrepreneurship");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "finance");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "food-cooking");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "gaming");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "general-knowledge");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "geography");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "history");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "language");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "literature");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "marketing");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mathematics");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mobile-dev");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "movies");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "music");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "programming");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "science");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "sports");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "web-dev");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "38dc3480-6414-4f43-a530-d8d9ef18aee6", null, "Admin", "ADMIN" },
                    { "6c717f26-127f-4fe7-b948-765a88276af0", null, "User", "USER" }
                });
        }
    }
}
