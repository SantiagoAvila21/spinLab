using Microsoft.EntityFrameworkCore;
using SpinLab.Api.Data;
using SpinLab.Api.Models;

namespace SpinLab.Api.Services
{
    public class ProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todos los productos
        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync();
        }

        // Obtener producto por Id
        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}
