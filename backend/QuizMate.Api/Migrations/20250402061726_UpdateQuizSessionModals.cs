using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizMate.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateQuizSessionModals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0c1d32bd-bf36-4014-ab2b-baf6a52b7ece");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "168da7f1-8caf-4212-b19d-1f0a471c6a40");

            migrationBuilder.CreateTable(
                name: "QuizSessions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuizId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    HostId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JoinCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CurrentQuestionIndex = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizSessions_AspNetUsers_HostId",
                        column: x => x.HostId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuizSessions_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quizzes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "QuizSessionParticipants",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuizSessionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ConnectionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LeftAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizSessionParticipants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizSessionParticipants_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuizSessionParticipants_QuizSessions_QuizSessionId",
                        column: x => x.QuizSessionId,
                        principalTable: "QuizSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuizSessionAnswers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuizSessionId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParticipantId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuestionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AnswerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    PointsEarned = table.Column<int>(type: "int", nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeTaken = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizSessionAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizSessionAnswers_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuizSessionAnswers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuizSessionAnswers_QuizSessionParticipants_ParticipantId",
                        column: x => x.ParticipantId,
                        principalTable: "QuizSessionParticipants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "38dc3480-6414-4f43-a530-d8d9ef18aee6", null, "Admin", "ADMIN" },
                    { "6c717f26-127f-4fe7-b948-765a88276af0", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessionAnswers_AnswerId",
                table: "QuizSessionAnswers",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessionAnswers_ParticipantId",
                table: "QuizSessionAnswers",
                column: "ParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessionAnswers_QuestionId",
                table: "QuizSessionAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessionParticipants_ConnectionId",
                table: "QuizSessionParticipants",
                column: "ConnectionId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessionParticipants_QuizSessionId",
                table: "QuizSessionParticipants",
                column: "QuizSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessionParticipants_UserId",
                table: "QuizSessionParticipants",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessions_HostId",
                table: "QuizSessions",
                column: "HostId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessions_JoinCode",
                table: "QuizSessions",
                column: "JoinCode",
                unique: true,
                filter: "[Status] IN ('Waiting', 'Active')");

            migrationBuilder.CreateIndex(
                name: "IX_QuizSessions_QuizId",
                table: "QuizSessions",
                column: "QuizId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuizSessionAnswers");

            migrationBuilder.DropTable(
                name: "QuizSessionParticipants");

            migrationBuilder.DropTable(
                name: "QuizSessions");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38dc3480-6414-4f43-a530-d8d9ef18aee6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6c717f26-127f-4fe7-b948-765a88276af0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0c1d32bd-bf36-4014-ab2b-baf6a52b7ece", null, "Admin", "ADMIN" },
                    { "168da7f1-8caf-4212-b19d-1f0a471c6a40", null, "User", "USER" }
                });
        }
    }
}
