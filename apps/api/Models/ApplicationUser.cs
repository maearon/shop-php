using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AdidasApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        public string? ActivationDigest { get; set; }

        public bool Activated { get; set; } = false;

        public DateTime? ActivatedAt { get; set; }

        public string? RememberDigest { get; set; }

        public string? ResetDigest { get; set; }

        public DateTime? ResetSentAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public bool Admin { get; set; } = false;

        // Navigation properties
        public virtual ICollection<Micropost> Microposts { get; set; } = new List<Micropost>();
        
        public virtual ICollection<Relationship> Following { get; set; } = new List<Relationship>();
        
        public virtual ICollection<Relationship> Followers { get; set; } = new List<Relationship>();
    }
}
