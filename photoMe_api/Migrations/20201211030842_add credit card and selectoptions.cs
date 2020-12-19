using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace photoMe_api.Migrations
{
    public partial class addcreditcardandselectoptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PackageId",
                table: "PhotoShoots",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CreditCards",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    CardName = table.Column<string>(nullable: true),
                    CardNumber = table.Column<string>(nullable: true),
                    ExpireDate = table.Column<string>(nullable: true),
                    CCV = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CreditCards_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Package",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Duration = table.Column<int>(nullable: false),
                    EditPhotos = table.Column<int>(nullable: false),
                    DownloadPhotos = table.Column<int>(nullable: false),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Package", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SelectOptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectOptions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PhotoShoots_PackageId",
                table: "PhotoShoots",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_CreditCards_UserId",
                table: "CreditCards",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PhotoShoots_Package_PackageId",
                table: "PhotoShoots",
                column: "PackageId",
                principalTable: "Package",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhotoShoots_Package_PackageId",
                table: "PhotoShoots");

            migrationBuilder.DropTable(
                name: "CreditCards");

            migrationBuilder.DropTable(
                name: "Package");

            migrationBuilder.DropTable(
                name: "SelectOptions");

            migrationBuilder.DropIndex(
                name: "IX_PhotoShoots_PackageId",
                table: "PhotoShoots");

            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PackageId",
                table: "PhotoShoots");
        }
    }
}
