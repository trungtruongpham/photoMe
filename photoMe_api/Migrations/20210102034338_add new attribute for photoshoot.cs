using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace photoMe_api.Migrations
{
    public partial class addnewattributeforphotoshoot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdditionalInfo",
                table: "PhotoShoots",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AdditionalServiceId",
                table: "PhotoShoots",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MeetingPlace",
                table: "PhotoShoots",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MeetingPlaceDetail",
                table: "PhotoShoots",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymenMethod",
                table: "PhotoShoots",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ShootDate",
                table: "PhotoShoots",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "AdditionalService",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalService", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PhotoShoots_AdditionalServiceId",
                table: "PhotoShoots",
                column: "AdditionalServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_PhotoShoots_AdditionalService_AdditionalServiceId",
                table: "PhotoShoots",
                column: "AdditionalServiceId",
                principalTable: "AdditionalService",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhotoShoots_AdditionalService_AdditionalServiceId",
                table: "PhotoShoots");

            migrationBuilder.DropTable(
                name: "AdditionalService");

            migrationBuilder.DropIndex(
                name: "IX_PhotoShoots_AdditionalServiceId",
                table: "PhotoShoots");

            migrationBuilder.DropColumn(
                name: "AdditionalInfo",
                table: "PhotoShoots");

            migrationBuilder.DropColumn(
                name: "AdditionalServiceId",
                table: "PhotoShoots");

            migrationBuilder.DropColumn(
                name: "MeetingPlace",
                table: "PhotoShoots");

            migrationBuilder.DropColumn(
                name: "MeetingPlaceDetail",
                table: "PhotoShoots");

            migrationBuilder.DropColumn(
                name: "PaymenMethod",
                table: "PhotoShoots");

            migrationBuilder.DropColumn(
                name: "ShootDate",
                table: "PhotoShoots");
        }
    }
}
