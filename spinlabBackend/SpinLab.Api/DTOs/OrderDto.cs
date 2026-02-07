namespace SpinLab.Api.DTOs;

public record OrderItemDto(
    int ProductId,
    string ProductName,
    decimal Price,
    int Quantity
);

public record OrderDto(
    int Id,
    int UserId,
    decimal Total,
    DateTime CreatedAt,
    List<OrderItemDto> Items
);

public record CreateOrderItemRequest(
    int ProductId,
    int Quantity
);

public record CreateOrderRequest(
    List<CreateOrderItemRequest> Items
);
