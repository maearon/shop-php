using DotNetBoilerplate.Data;
using DotNetBoilerplate.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace DotNetBoilerplate.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RelationshipsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public RelationshipsController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // POST: api/relationships
        [HttpPost]
        public async Task<IActionResult> Follow([FromBody] FollowDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var followedUser = await _userManager.FindByIdAsync(model.FollowedId);
            
            if (followedUser == null)
            {
                return NotFound();
            }

            if (userId == model.FollowedId)
            {
                return BadRequest(new { message = "You cannot follow yourself" });
            }

            // Check if already following
            var existingRelationship = await _context.Relationships
                .FirstOrDefaultAsync(r => r.FollowerId == userId && r.FollowedId == model.FollowedId);

            if (existingRelationship != null)
            {
                return BadRequest(new { message = "Already following this user" });
            }

            var relationship = new Relationship
            {
                FollowerId = userId,
                FollowedId = model.FollowedId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Relationships.Add(relationship);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Successfully followed user" });
        }

        // DELETE: api/relationships/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Unfollow(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var relationship = await _context.Relationships
                .FirstOrDefaultAsync(r => r.FollowerId == userId && r.FollowedId == id);

            if (relationship == null)
            {
                return NotFound();
            }

            _context.Relationships.Remove(relationship);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class FollowDto
    {
        [Required]
        public string FollowedId { get; set; } = string.Empty;
    }
}
