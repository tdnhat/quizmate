using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryIsFeatured : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b53dcb3e-fe92-4aeb-bbcc-3bfa1b88fcca");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f87b5594-2308-4d06-9ca7-dcbb995c627d");

            migrationBuilder.AddColumn<bool>(
                name: "IsFeatured",
                table: "Categories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5a9ee427-d01f-4988-85cb-2e9e5d92acf4", null, "Admin", "ADMIN" },
                    { "7942d2cc-637c-41d7-a084-178495e719ff", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5a9ee427-d01f-4988-85cb-2e9e5d92acf4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7942d2cc-637c-41d7-a084-178495e719ff");

            migrationBuilder.DropColumn(
                name: "IsFeatured",
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
    }
}
