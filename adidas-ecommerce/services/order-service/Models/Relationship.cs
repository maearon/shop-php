using System.ComponentModel.DataAnnotations.Schema;

namespace OrderService.Models
{
    public class Relationship
    {
        [ForeignKey("Follower")]
        public string FollowerId { get; set; } = string.Empty;

        [ForeignKey("Followed")]
        public string FollowedId { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ApplicationUser? Follower { get; set; }
        public virtual ApplicationUser? Followed { get; set; }
    }
}
