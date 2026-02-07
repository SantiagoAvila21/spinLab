using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpinLab.Api.Data;
using SpinLab.Api.DTOs;
using SpinLab.Api.Models;
using SpinLab.Api.Services;
using System.Security.Cryptography;
using System.Text;

namespace SpinLab.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private static readonly List<User> Users = new();
    private readonly JwtService _jwt;
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context, JwtService jwt)
    {
        _context = context;
        _jwt = jwt;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return BadRequest("El usuario ya existe");

        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = HashPassword(request.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Usuario registrado");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || user.PasswordHash != HashPassword(request.Password))
            return Unauthorized("Credenciales inválidas");

        var token = _jwt.GenerateToken(user);

        return Ok(new AuthResponse(token, user.Name, user.Email));
    }

    private static string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
}