using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCategoryQuizCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "b53dcb3e-fe92-4aeb-bbcc-3bfa1b88fcca", null, "User", "USER" },
                    { "f87b5594-2308-4d06-9ca7-dcbb995c627d", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b53dcb3e-fe92-4aeb-bbcc-3bfa1b88fcca");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f87b5594-2308-4d06-9ca7-dcbb995c627d");

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
    }
}
