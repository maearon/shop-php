using OrderService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace OrderService.Data
{
    public static class SeedData
    {
        public static async Task InitializeAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            context.Database.Migrate();

            // Create roles
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }

            // Create admin user
            if (await userManager.FindByEmailAsync("admin@example.com") == null)
            {
                var admin = new ApplicationUser
                {
                    UserName = "admin@example.com",
                    Email = "admin@example.com",
                    Name = "Admin User",
                    EmailConfirmed = true,
                    ActivationDigest = null,
                    Activated = true,
                    Admin = true,
                    ActivatedAt = DateTime.UtcNow
                };

                var result = await userManager.CreateAsync(admin, "Admin123!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }

            // Create sample users if needed
            if (!context.Users.Any(u => u.Email != "admin@example.com"))
            {
                for (int i = 1; i <= 10; i++)
                {
                    var email = $"user{i}@example.com";
                    if (await userManager.FindByEmailAsync(email) == null)
                    {
                        var user = new ApplicationUser
                        {
                            UserName = email,
                            Email = email,
                            Name = $"User {i}",
                            EmailConfirmed = true,
                            ActivationDigest = null,
                            Activated = true,
                            ActivatedAt = DateTime.UtcNow
                        };

                        var result = await userManager.CreateAsync(user, "User123!");
                        if (result.Succeeded)
                        {
                            await userManager.AddToRoleAsync(user, "User");
                        }
                    }
                }
            }

            // Create sample microposts
            if (!context.Microposts.Any())
            {
                var users = await userManager.Users.ToListAsync();
                var random = new Random();

                foreach (var user in users)
                {
                    var postsCount = random.Next(1, 6);
                    for (int i = 0; i < postsCount; i++)
                    {
                        context.Microposts.Add(new Micropost
                        {
                            Content = $"Sample micropost {i + 1} from {user.Name}",
                            UserId = user.Id,
                            CreatedAt = DateTime.UtcNow.AddDays(-random.Next(0, 30)),
                            UpdatedAt = DateTime.UtcNow.AddDays(-random.Next(0, 30))
                        });
                    }
                }

                await context.SaveChangesAsync();
            }

            // Create sample relationships
            if (!context.Relationships.Any())
            {
                var users = await userManager.Users.ToListAsync();
                var random = new Random();

                foreach (var user in users)
                {
                    var followingCount = random.Next(1, 5);
                    var potentialFollowings = users.Where(u => u.Id != user.Id).ToList();
                    
                    for (int i = 0; i < followingCount && i < potentialFollowings.Count; i++)
                    {
                        var followedUser = potentialFollowings[i];
                        context.Relationships.Add(new Relationship
                        {
                            FollowerId = user.Id,
                            FollowedId = followedUser.Id,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        });
                    }
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
