using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpinLab.Api.Data;
using SpinLab.Api.Dtos;
using SpinLab.Api.DTOs;
using SpinLab.Api.Models;
using System.Security.Claims;

namespace SpinLab.Api.Controllers;

[ApiController]
[Route("api/store/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    // Simulamos DB por ahora
    private static int _orderId = 1;
    private readonly AppDbContext _db;

    public OrdersController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(Dtos.CreateOrderRequest request)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        if (!request.Items.Any())
            return BadRequest("El pedido no puede estar vacío");

        // Crear los items de la orden desde los productos reales
        var orderItems = new List<OrderItem>();

        foreach (var item in request.Items)
        {
            var product = await _db.Products.FindAsync(item.ProductId);
            if (product == null)
                return BadRequest($"Producto con ID {item.ProductId} no existe");

            orderItems.Add(new OrderItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                Price = product.Price,
                Quantity = item.Quantity
            });
        }

        var order = new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            Items = orderItems
        };

        order.Total = order.Items.Sum(i => i.Price * i.Quantity);

        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        // Map a DTO para evitar ciclos en JSON
        var orderDto = new OrderDto(
            order.Id,
            order.UserId,
            order.Total,
            order.CreatedAt,
            order.Items.Select(i => new OrderItemDto(
                i.ProductId,
                i.ProductName,
                i.Price,
                i.Quantity
            )).ToList()
        );

        return Ok(orderDto);
    }

}
