using OrderService.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace OrderService.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Micropost> Microposts { get; set; }
        public DbSet<Relationship> Relationships { get; set; }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<Payment> Payments => Set<Payment>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Micropost>()
                .Property(m => m.Id)
                .ValueGeneratedOnAdd();

            // Configure Micropost entity
            modelBuilder.Entity<Micropost>()
                .HasOne(m => m.User)
                .WithMany(u => u.Microposts)
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Relationship entity
            modelBuilder.Entity<Relationship>()
                .HasKey(r => new { r.FollowerId, r.FollowedId });

            modelBuilder.Entity<Relationship>()
                .HasOne(r => r.Follower)
                .WithMany(u => u.Following)
                .HasForeignKey(r => r.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Relationship>()
                .HasOne(r => r.Followed)
                .WithMany(u => u.Followers)
                .HasForeignKey(r => r.FollowedId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
