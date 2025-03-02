using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddIsCorrectFieldInResultAnswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4aa468b8-2cbe-466e-8ce7-4f07afc1d951");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe2c71a2-8ee5-412f-a1d8-e222a50b4518");

            migrationBuilder.AddColumn<bool>(
                name: "IsCorrect",
                table: "ResultAnswers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7ab0d7ca-5f9e-45c9-91a9-ebaee418304e", null, "Admin", "ADMIN" },
                    { "f0c9be38-150a-4f12-b1ec-3da1b0978d3d", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7ab0d7ca-5f9e-45c9-91a9-ebaee418304e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f0c9be38-150a-4f12-b1ec-3da1b0978d3d");

            migrationBuilder.DropColumn(
                name: "IsCorrect",
                table: "ResultAnswers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4aa468b8-2cbe-466e-8ce7-4f07afc1d951", null, "User", "USER" },
                    { "fe2c71a2-8ee5-412f-a1d8-e222a50b4518", null, "Admin", "ADMIN" }
                });
        }
    }
}
