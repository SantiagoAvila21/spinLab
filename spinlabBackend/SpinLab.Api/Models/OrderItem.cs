using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SpinLab.Api.Models;
public class OrderItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int ProductId { get; set; }

    public string ProductName { get; set; } = "";

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    [Required]
    public int OrderId { get; set; }

    [ForeignKey("OrderId")]
    public Order Order { get; set; } = null!;
}