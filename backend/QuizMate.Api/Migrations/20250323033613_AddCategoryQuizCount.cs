using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryQuizCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "31140857-bb0a-4bf2-b350-975aabaa5d83");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aca3ff22-2206-40ef-b214-912a5714a75d");

            migrationBuilder.AddColumn<int>(
                name: "QuizCount",
                table: "Categories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "53861358-fd2a-43ce-a3d2-8b2c05971ab0", null, "User", "USER" },
                    { "6f19d074-b95e-4585-ae11-a94b715f1162", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "53861358-fd2a-43ce-a3d2-8b2c05971ab0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6f19d074-b95e-4585-ae11-a94b715f1162");

            migrationBuilder.DropColumn(
                name: "QuizCount",
                table: "Categories");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "31140857-bb0a-4bf2-b350-975aabaa5d83", null, "User", "USER" },
                    { "aca3ff22-2206-40ef-b214-912a5714a75d", null, "Admin", "ADMIN" }
                });
        }
    }
}
