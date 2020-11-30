using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace photoMe_api.Migrations
{
    public partial class addshoottimetophotoshoot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Users_UserId1",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_UserId1",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Photos");

            migrationBuilder.AddColumn<DateTime>(
                name: "ShootTime",
                table: "PhotoShoots",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShootTime",
                table: "PhotoShoots");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "Photos",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_UserId1",
                table: "Photos",
                column: "UserId1",
                unique: true,
                filter: "[UserId1] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Users_UserId1",
                table: "Photos",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
