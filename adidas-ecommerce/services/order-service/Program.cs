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
// using OrderService.Support;
using System.Net;
using System.IO;
using Microsoft.IdentityModel.Logging;
using OrderService.Data;
using OrderService.Models;
using OrderService.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

try
{
var builder = WebApplication.CreateBuilder(args);

// Use MVC explicitly
builder.Services.AddControllersWithViews();

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/api-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add Swagger & Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
    
// Load JWT config
var jwtSettings = builder.Configuration.GetSection("Jwt");
// var secretKey = jwtSettings["Key"];
// var issuer = jwtSettings["Issuer"];
// var audience = jwtSettings["Audience"];

// Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => {
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 6;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

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

// JWT Authentication (optional, in case you want to combine with API tokens)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"] ?? "super-secret-key"))
        };
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

// HTTP Clients for Microservices
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

// If you need to configure cookie policy for SameSite=None, use the following:
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.None;
    options.Secure = CookieSecurePolicy.Always;
});

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAll");
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();

// Health check
app.MapGet("/health", () => new { Status = "Healthy", Service = "API Gateway" });

// Proxy endpoints
app.MapPost("/api/users", async (HttpContext context, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("UsersService");
    var requestContent = await new StreamReader(context.Request.Body).ReadToEndAsync();
    var response = await client.PostAsync("/users", new StringContent(requestContent, Encoding.UTF8, "application/json"));

    var content = await response.Content.ReadAsStringAsync();
    var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/json";
    return Results.Content(content, contentType, statusCode: (int)response.StatusCode);
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
    var response = await client.PostAsync("/orders", new StringContent(requestContent, Encoding.UTF8, "application/json"));

    var content = await response.Content.ReadAsStringAsync();
    var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/json";
    var statusCode = (int)response.StatusCode;
    return Results.Content(content, contentType, statusCode: statusCode);
});

app.MapPost("/api/search", async (HttpContext context, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient("SearchService");
    var requestContent = await new StreamReader(context.Request.Body).ReadToEndAsync();
    var response = await client.PostAsync("/search", new StringContent(requestContent, Encoding.UTF8, "application/json"));

    var content = await response.Content.ReadAsStringAsync();
    var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/json";
    var statusCode = (int)response.StatusCode;
    return Results.Content(content, contentType, statusCode: statusCode);
});

app.MapControllers();

app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});

    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine($"Error during app startup: {ex.Message}");
    throw;
}