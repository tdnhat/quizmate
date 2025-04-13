using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCategoryID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b23cf32-9cab-4951-93ae-9b69800b5124");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2e8b7ea-de1f-453f-9161-f99f22c6cb5d");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "art-design");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "computer-science");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "data-science");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "food-cooking");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "general-knowledge");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "language");

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
                keyValue: "web-dev");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d07e35f5-0d8e-4846-bc1f-2e568fdaa9b2", null, "Admin", "ADMIN" },
                    { "f5d1993a-247b-40ef-a093-c2e239ceaded", null, "User", "USER" }
                });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "ai",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8132));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "business",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8156));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "cybersecurity",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8149));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "entrepreneurship",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8178));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "finance",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8163));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "gaming",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8200));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "geography",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8232));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "history",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8109));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "literature",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8253));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "marketing",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8170));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mathematics",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8096));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "music",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8192));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "programming",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8083));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "science",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8102));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "sports",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8211));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ColorPreset", "CreatedAt", "Description", "Image", "IsFeatured", "Name", "QuizCount", "Slug" },
                values: new object[,]
                {
                    { "art_design", "violet", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8246), "Fine arts, design principles, art history, and creative techniques.", null, false, "Art & Design", 0, "art-design" },
                    { "computer_science", "indigo", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8091), "Theoretical computer science, algorithms, data structures, and computing concepts.", null, false, "Computer Science", 0, "computer-science" },
                    { "data_science", "purple", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8125), "Data analysis, machine learning, and statistical methods.", null, false, "Data Science", 0, "data-science" },
                    { "food_cooking", "orange", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8239), "Culinary arts, cuisine, ingredients, and cooking techniques.", null, false, "Food & Cooking", 0, "food-cooking" },
                    { "general_knowledge", "teal", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8218), "Diverse topics testing overall knowledge and trivia.", null, false, "General Knowledge", 0, "general-knowledge" },
                    { "languages", "indigo", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8225), "Vocabulary, grammar, and linguistic concepts from various languages.", null, false, "Languages", 0, "language" },
                    { "mobile_dev", "emerald", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8141), "iOS, Android, and cross-platform mobile development.", null, false, "Mobile Development", 0, "mobile-dev" },
                    { "movies_tv", "red", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8185), "Film history, TV shows, actors, directors, and cinema trivia.", null, false, "Movies & TV", 0, "movies" },
                    { "web_dev", "sky", new DateTime(2025, 4, 13, 8, 50, 44, 670, DateTimeKind.Utc).AddTicks(8119), "Frontend, backend, and full-stack web development topics.", null, false, "Web Development", 0, "web-dev" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d07e35f5-0d8e-4846-bc1f-2e568fdaa9b2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f5d1993a-247b-40ef-a093-c2e239ceaded");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "art_design");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "computer_science");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "data_science");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "food_cooking");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "general_knowledge");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "languages");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mobile_dev");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "movies_tv");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "web_dev");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8b23cf32-9cab-4951-93ae-9b69800b5124", null, "Admin", "ADMIN" },
                    { "a2e8b7ea-de1f-453f-9161-f99f22c6cb5d", null, "User", "USER" }
                });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "ai",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9664));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "business",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9687));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "cybersecurity",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9680));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "entrepreneurship",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9707));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "finance",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9694));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "gaming",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9731));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "geography",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9806));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "history",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9628));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "literature",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9829));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "marketing",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9701));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mathematics",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9617));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "music",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9724));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "programming",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9602));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "science",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9621));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "sports",
                column: "CreatedAt",
                value: new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9740));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ColorPreset", "CreatedAt", "Description", "Image", "IsFeatured", "Name", "QuizCount", "Slug" },
                values: new object[,]
                {
                    { "art-design", "violet", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9822), "Fine arts, design principles, art history, and creative techniques.", null, false, "Art & Design", 0, "art-design" },
                    { "computer-science", "indigo", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9609), "Theoretical computer science, algorithms, data structures, and computing concepts.", null, false, "Computer Science", 0, "computer-science" },
                    { "data-science", "purple", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9657), "Data analysis, machine learning, and statistical methods.", null, false, "Data Science", 0, "data-science" },
                    { "food-cooking", "orange", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9813), "Culinary arts, cuisine, ingredients, and cooking techniques.", null, false, "Food & Cooking", 0, "food-cooking" },
                    { "general-knowledge", "teal", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9750), "Diverse topics testing overall knowledge and trivia.", null, false, "General Knowledge", 0, "general-knowledge" },
                    { "language", "indigo", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9798), "Vocabulary, grammar, and linguistic concepts from various languages.", null, false, "Languages", 0, "language" },
                    { "mobile-dev", "emerald", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9671), "iOS, Android, and cross-platform mobile development.", null, false, "Mobile Development", 0, "mobile-dev" },
                    { "movies", "red", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9717), "Film history, TV shows, actors, directors, and cinema trivia.", null, false, "Movies & TV", 0, "movies" },
                    { "web-dev", "sky", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9637), "Frontend, backend, and full-stack web development topics.", null, false, "Web Development", 0, "web-dev" }
                });
        }
    }
}
