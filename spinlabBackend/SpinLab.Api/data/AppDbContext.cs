using Microsoft.EntityFrameworkCore;
using SpinLab.Api.Models;

namespace SpinLab.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data: productos iniciales
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Raqueta Butterfly Timo Boll ALC",
                    Price = 850000,
                    Image = "https://deporteka.com.co/wp-content/uploads/2022/05/35861_01-600x600.webp",
                    Category = "Raquetas",
                    Rating = 4.8,
                    Brand = "Butterfly"
                },
                new Product
                {
                    Id = 2,
                    Name = "Raqueta DHS Hurricane 301",
                    Price = 620000,
                    Image = "https://revspin.net/images/blade/dhs-hurricane-301.jpg",
                    Category = "Raquetas",
                    Rating = 4.6,
                    Brand = "DHS"
                },
                new Product
                {
                    Id = 3,
                    Name = "Pelotas Butterfly 40+ (6 unidades)",
                    Price = 78000,
                    Image = "https://revspin.net/images/balls/butterfly-3-star-40-plus-poly.jpg",
                    Category = "Pelotas",
                    Rating = 4.5,
                    Brand = "Butterfly"
                },
                new Product
                {
                    Id = 4,
                    Name = "Goma DHS Hurricane 3 Neo",
                    Price = 145000,
                    Image = "https://revspin.net/images/rubber/dhs-neo-hurricane-3-provincial-blue-sponge.jpg",
                    Category = "Gomas",
                    Rating = 4.7,
                    Brand = "DHS"
                },
                new Product
                {
                    Id = 5,
                    Name = "Mesa de Tenis de Mesa Stiga Advantage",
                    Price = 1850000,
                    Image = "https://images.weserv.nl/?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F715H6LW4MpL.jpg&w=640&q=100&output=webp",
                    Category = "Mesas",
                    Rating = 4.9,
                    Brand = "Stiga"
                },
                new Product
                {
                    Id = 6,
                    Name = "Estuche Butterfly Doble",
                    Price = 98000,
                    Image = "https://www.rocayaltura.co/4739-large_default/estuche-butterfly-2-raquetas.jpg",
                    Category = "Accesorios",
                    Rating = 4.4,
                    Brand = "Butterfly"
                }
            );
        }
    }
}
