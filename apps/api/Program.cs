using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text;
using Serilog;
using Auth0.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SampleMvcApp.Support;
using System.Net;

using Microsoft.IdentityModel.Logging;

var builder = WebApplication.CreateBuilder(args);

//To use MVC we have to explicitly declare we are using it. Doing so will prevent a System.InvalidOperationException.
builder.Services.AddControllersWithViews();

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
    var connectionString = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";
    return ConnectionMultiplexer.Connect(connectionString);
});

// Auth0 Authentication
builder.Services.AddAuth0WebAppAuthentication(options =>
{
    options.Domain = builder.Configuration["Auth0:Domain"] ?? "your-domain.auth0.com";
    options.ClientId = builder.Configuration["Auth0:ClientId"] ?? "your_auth0_client_id";
    options.ClientSecret = builder.Configuration["Auth0:ClientSecret"] ?? "your_auth0_client_secret";
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
    client.BaseAddress = new Uri(builder.Configuration["Services:Users:BaseUrl"] ?? "http://users:3001");
});

builder.Services.AddHttpClient("OrdersService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Orders:BaseUrl"] ?? "http://orders:3002");
});

builder.Services.AddHttpClient("PaymentsService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Payments:BaseUrl"] ?? "http://payments:3003");
});

builder.Services.AddHttpClient("SearchService", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Services:Search:BaseUrl"] ?? "http://search:3004");
});
builder.Services.AddAuth0WebAppAuthentication(options =>
{
    options.Domain = builder.Configuration["Auth0:Domain"];
    options.ClientId = builder.Configuration["Auth0:ClientId"];
});

// Configure the HTTP request pipeline.
builder.Services.ConfigureSameSiteNoneCookies();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseStaticFiles();
app.UseCookiePolicy();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Health check endpoint
app.MapGet("/health", () => new { Status = "Healthy", Service = "API Gateway" });

// Proxy endpoints
app.MapPost("/api/users", async (HttpContext context, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("UsersService");
    var requestContent = await new StreamReader(context.Request.Body).ReadToEndAsync();
    var response = await client.PostAsync("/users", new StringContent(
        requestContent,
        Encoding.UTF8, 
        "application/json"));
    
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
    var requestContent = await new StreamReader(context.Request.Body).ReadToEndAsync();
    var response = await client.PostAsync("/orders", new StringContent(
        requestContent,
        Encoding.UTF8, 
        "application/json"));
    
    return Results.Content(await response.Content.ReadAsStringAsync(), 
        response.Content.Headers.ContentType?.ToString(), (int)response.StatusCode);
});

app.MapPost("/api/search", async (HttpContext context, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("SearchService");
    var requestContent = await new StreamReader(context.Request.Body).ReadToEndAsync();
    var response = await client.PostAsync("/search", new StringContent(
        requestContent,
        Encoding.UTF8, 
        "application/json"));
    
    return Results.Content(await response.Content.ReadAsStringAsync(), 
        response.Content.Headers.ContentType?.ToString(), (int)response.StatusCode);
});

app.MapControllers();
app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});

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
