using OrderService.Data;
using OrderService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace OrderService.Controllers
{
    [Authorize]
    public class RelationshipsController : Controller
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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(string followedId)
        {
            if (string.IsNullOrEmpty(followedId))
            {
                return BadRequest();
            }

            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null)
            {
                return NotFound();
            }

            var followedUser = await _userManager.FindByIdAsync(followedId);
            if (followedUser == null)
            {
                return NotFound();
            }

            // Check if already following
            var existingRelationship = await _context.Relationships
                .FirstOrDefaultAsync(r => r.FollowerId == currentUser.Id && r.FollowedId == followedId);

            if (existingRelationship == null)
            {
                var relationship = new Relationship
                {
                    FollowerId = currentUser.Id,
                    FollowedId = followedId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Relationships.Add(relationship);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Show", "Users", new { id = followedId });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(string followedId)
        {
            if (string.IsNullOrEmpty(followedId))
            {
                return BadRequest();
            }

            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser == null)
            {
                return NotFound();
            }

            var relationship = await _context.Relationships
                .FirstOrDefaultAsync(r => r.FollowerId == currentUser.Id && r.FollowedId == followedId);

            if (relationship != null)
            {
                _context.Relationships.Remove(relationship);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Show", "Users", new { id = followedId });
        }
    }
}
