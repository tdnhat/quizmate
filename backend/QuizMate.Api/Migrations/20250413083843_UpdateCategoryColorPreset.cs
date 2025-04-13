using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCategoryColorPreset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7a63d51-0344-4e9c-8ac2-d6054527a94e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d489a400-69e4-4de5-aa01-270b590fefcd");

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
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "violet", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9664) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "art-design",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "violet", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9822) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "business",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "slate", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9687) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "computer-science",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "indigo", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9609) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "cybersecurity",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "red", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9680) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "data-science",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "purple", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9657) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "entrepreneurship",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "yellow", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9707) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "finance",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "green", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9694) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "food-cooking",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "orange", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9813) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "gaming",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "lime", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9731) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "general-knowledge",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "teal", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9750) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "geography",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "emerald", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9806) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "history",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "orange", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9628) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "language",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "indigo", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9798) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "literature",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "yellow", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9829) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "marketing",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "pink", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9701) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mathematics",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "teal", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9617) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mobile-dev",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "emerald", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9671) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "movies",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "red", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9717) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "music",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "purple", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9724) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "programming",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "blue", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9602) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "science",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "green", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9621) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "sports",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "blue", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9740) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "web-dev",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "sky", new DateTime(2025, 4, 13, 8, 38, 42, 692, DateTimeKind.Utc).AddTicks(9637) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b23cf32-9cab-4951-93ae-9b69800b5124");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2e8b7ea-de1f-453f-9161-f99f22c6cb5d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c7a63d51-0344-4e9c-8ac2-d6054527a94e", null, "Admin", "ADMIN" },
                    { "d489a400-69e4-4de5-aa01-270b590fefcd", null, "User", "USER" }
                });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "ai",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6572) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "art-design",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6705) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "business",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6597) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "computer-science",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6528) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "cybersecurity",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6590) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "data-science",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6565) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "entrepreneurship",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6617) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "finance",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6603) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "food-cooking",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6699) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "gaming",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6635) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "general-knowledge",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6680) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "geography",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6693) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "history",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6548) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "language",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6687) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "literature",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6711) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "marketing",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6611) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mathematics",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6535) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "mobile-dev",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6581) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "movies",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6623) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "music",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6627) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "programming",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6520) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "science",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6541) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "sports",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6643) });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "web-dev",
                columns: new[] { "ColorPreset", "CreatedAt" },
                values: new object[] { "", new DateTime(2025, 4, 13, 8, 31, 29, 173, DateTimeKind.Utc).AddTicks(6557) });
        }
    }
}
