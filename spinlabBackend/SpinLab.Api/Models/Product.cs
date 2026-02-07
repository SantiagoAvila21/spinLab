namespace SpinLab.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public string Category { get; set; } = "";
    public string Brand { get; set; } = "";
    public string Image { get; set; } = "";
    public double Rating { get; set; }
}
