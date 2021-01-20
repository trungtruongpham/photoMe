using Microsoft.EntityFrameworkCore.Migrations;

namespace photoMe_api.Migrations
{
    public partial class updatephotoshoot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymenMethod",
                table: "PhotoShoots");

            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "PhotoShoots",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "PhotoShoots",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "PhotoShoots");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "PhotoShoots");

            migrationBuilder.AddColumn<string>(
                name: "PaymenMethod",
                table: "PhotoShoots",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
