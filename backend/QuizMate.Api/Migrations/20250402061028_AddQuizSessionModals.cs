using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddQuizSessionModals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "140fe192-9ccd-4f00-bb50-7f2557622e8e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8027cee5-8bc4-43f8-b8cc-c40466852e83");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0c1d32bd-bf36-4014-ab2b-baf6a52b7ece", null, "Admin", "ADMIN" },
                    { "168da7f1-8caf-4212-b19d-1f0a471c6a40", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0c1d32bd-bf36-4014-ab2b-baf6a52b7ece");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "168da7f1-8caf-4212-b19d-1f0a471c6a40");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "140fe192-9ccd-4f00-bb50-7f2557622e8e", null, "User", "USER" },
                    { "8027cee5-8bc4-43f8-b8cc-c40466852e83", null, "Admin", "ADMIN" }
                });
        }
    }
}
