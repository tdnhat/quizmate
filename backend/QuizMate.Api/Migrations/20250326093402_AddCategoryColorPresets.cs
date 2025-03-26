using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryColorPresets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aa9f09a7-c7e8-422d-8f99-0244a1861d26");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e91d3f78-917d-4e99-b5ab-cb06cf1cc7ad");

            migrationBuilder.RenameColumn(
                name: "Color",
                table: "Categories",
                newName: "ColorPreset");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "140fe192-9ccd-4f00-bb50-7f2557622e8e", null, "User", "USER" },
                    { "8027cee5-8bc4-43f8-b8cc-c40466852e83", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "140fe192-9ccd-4f00-bb50-7f2557622e8e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8027cee5-8bc4-43f8-b8cc-c40466852e83");

            migrationBuilder.RenameColumn(
                name: "ColorPreset",
                table: "Categories",
                newName: "Color");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "aa9f09a7-c7e8-422d-8f99-0244a1861d26", null, "User", "USER" },
                    { "e91d3f78-917d-4e99-b5ab-cb06cf1cc7ad", null, "Admin", "ADMIN" }
                });
        }
    }
}
