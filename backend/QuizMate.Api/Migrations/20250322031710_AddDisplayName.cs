using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDisplayName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "360f7ebc-1792-4f89-bedb-d030c6e79a7b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5f480222-cad4-4b94-85ce-76a9011bfdcf");

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "42517fbf-a068-4de3-be46-1bf0ff3eefea", null, "Admin", "ADMIN" },
                    { "4e2ad4ee-c905-41ba-945b-6b7a021cdc96", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42517fbf-a068-4de3-be46-1bf0ff3eefea");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4e2ad4ee-c905-41ba-945b-6b7a021cdc96");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "360f7ebc-1792-4f89-bedb-d030c6e79a7b", null, "User", "USER" },
                    { "5f480222-cad4-4b94-85ce-76a9011bfdcf", null, "Admin", "ADMIN" }
                });
        }
    }
}
