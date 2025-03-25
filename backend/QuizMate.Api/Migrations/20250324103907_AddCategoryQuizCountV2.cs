using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryQuizCountV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "662158af-c3af-48c8-9814-3b6ebf49d3da");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9702f8eb-da50-458d-b585-97ea82402fe0");

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
                    { "aa9f09a7-c7e8-422d-8f99-0244a1861d26", null, "User", "USER" },
                    { "e91d3f78-917d-4e99-b5ab-cb06cf1cc7ad", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aa9f09a7-c7e8-422d-8f99-0244a1861d26");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e91d3f78-917d-4e99-b5ab-cb06cf1cc7ad");

            migrationBuilder.DropColumn(
                name: "QuizCount",
                table: "Categories");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "662158af-c3af-48c8-9814-3b6ebf49d3da", null, "Admin", "ADMIN" },
                    { "9702f8eb-da50-458d-b585-97ea82402fe0", null, "User", "USER" }
                });
        }
    }
}
