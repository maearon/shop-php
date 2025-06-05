using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text;
using Serilog;
using Auth0.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/api-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(provider =>
{
    var connectionString = builder.Configuration.GetConnectionString("Redis");
    return ConnectionMultiplexer.Connect(connectionString);
});

// Auth0 Authentication
builder.Services.AddAuth0WebAppAuthentication(options =>
{
    options.Domain = builder.Configuration["Auth0:Domain"];
    options.ClientId = builder.Configuration["Auth0:ClientId"];
    options.ClientSecret = builder.Configuration["Auth0:ClientSecret"];
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// HTTP Clients for microservices
builder.Services.AddHttpClient("UsersService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Users:BaseUrl"]);
});

builder.Services.AddHttpClient("OrdersService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Orders:BaseUrl"]);
});

builder.Services.AddHttpClient("PaymentsService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Payments:BaseUrl"]);
});

builder.Services.AddHttpClient("SearchService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Search:BaseUrl"]);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

// Health check endpoint
app.MapGet("/health", () => new { Status = "Healthy", Service = "API Gateway" });

// Proxy endpoints
app.MapPost("/api/users", async (HttpContext context, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("UsersService");
    var response = await client.PostAsync("/users", new StringContent(
        await new StreamReader(context.Request.Body).ReadToEndAsync(),
        Encoding.UTF8, "application/json"));
    
    return Results.Content(await response.Content.ReadAsStringAsync(), 
        response.Content.Headers.ContentType?.ToString(), (int)response.StatusCode);
});

app.MapGet("/api/users/{id}", async (string id, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("UsersService");
    var response = await client.GetAsync($"/users/{id}");
    
    if (response.IsSuccessStatusCode)
    {
        var content = await response.Content.ReadAsStringAsync();
        return Results.Content(content, "application/json");
    }
    
    return Results.NotFound();
});

app.MapPost("/api/orders", async (HttpContext context, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("OrdersService");
    var response = await client.PostAsync("/orders", new StringContent(
        await new StreamReader(context.Request.Body).ReadToEndAsync(),
        Encoding.UTF8, "application/json"));
    
    return Results.Content(await response.Content.ReadAsStringAsync(), 
        response.Content.Headers.ContentType?.ToString(), (int)response.StatusCode);
});

app.MapPost("/api/search", async (HttpContext context, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("SearchService");
    var response = await client.PostAsync("/search", new StringContent(
        await new StreamReader(context.Request.Body).ReadToEndAsync(),
        Encoding.UTF8, "application/json"));
    
    return Results.Content(await response.Content.ReadAsStringAsync(), 
        response.Content.Headers.ContentType?.ToString(), (int)response.StatusCode);
});

app.MapControllers();

app.Run();

// DbContext
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Payment> Payments { get; set; }
}

// Models
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Auth0Id { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class Order
{
    public string Id { get; set; } = string.Empty;
    public int UserId { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class Payment
{
    public string Id { get; set; } = string.Empty;
    public string OrderId { get; set; } = string.Empty;
    public string StripePaymentIntentId { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
