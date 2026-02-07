using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SpinLab.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    Brand = table.Column<string>(type: "TEXT", nullable: false),
                    Image = table.Column<string>(type: "TEXT", nullable: false),
                    Rating = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "Category", "Image", "Name", "Price", "Rating" },
                values: new object[,]
                {
                    { 1, "Butterfly", "Raquetas", "https://deporteka.com.co/wp-content/uploads/2022/05/35861_01-600x600.webp", "Raqueta Butterfly Timo Boll ALC", 850000m, 4.7999999999999998 },
                    { 2, "DHS", "Raquetas", "https://revspin.net/images/blade/dhs-hurricane-301.jpg", "Raqueta DHS Hurricane 301", 620000m, 4.5999999999999996 },
                    { 3, "Butterfly", "Pelotas", "https://revspin.net/images/balls/butterfly-3-star-40-plus-poly.jpg", "Pelotas Butterfly 40+ (6 unidades)", 78000m, 4.5 },
                    { 4, "DHS", "Gomas", "https://revspin.net/images/rubber/dhs-neo-hurricane-3-provincial-blue-sponge.jpg", "Goma DHS Hurricane 3 Neo", 145000m, 4.7000000000000002 },
                    { 5, "Stiga", "Mesas", "https://images.weserv.nl/?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F715H6LW4MpL.jpg&w=640&q=100&output=webp", "Mesa de Tenis de Mesa Stiga Advantage", 1850000m, 4.9000000000000004 },
                    { 6, "Butterfly", "Accesorios", "https://www.rocayaltura.co/4739-large_default/estuche-butterfly-2-raquetas.jpg", "Estuche Butterfly Doble", 98000m, 4.4000000000000004 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
