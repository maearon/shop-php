using AdidasApi.Data;
using AdidasApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;

namespace AdidasApi.Controllers.Api
{
    [Route("api")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public HomeController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api?page=1&pageSize=10
        [HttpGet]
        public async Task<IActionResult> Index(int page = 1, int pageSize = 10)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated." });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            var followedUserIds = await _context.Relationships
                .Where(r => r.FollowerId == userId)
                .Select(r => r.FollowedId)
                .ToListAsync();

            followedUserIds.Add(userId); // Include self-posts

            var feedItemsQuery = _context.Microposts
                .Include(m => m.User)
                .Where(m => followedUserIds.Contains(m.UserId))
                .OrderByDescending(m => m.CreatedAt);

            var total_count = await feedItemsQuery.CountAsync();
            var feed_items = await feedItemsQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var micropost = await _context.Microposts.CountAsync(m => m.UserId == user.Id);
            var following = await _context.Relationships.CountAsync(r => r.FollowerId == user.Id);
            var followers = await _context.Relationships.CountAsync(r => r.FollowedId == user.Id);
            var totalUsers = await _userManager.Users.CountAsync();

            var email = user.Email?.ToLower() ?? "test@example.com";
            var gravatar_id = GetMd5Hash(email);
            var totalPages = (int)Math.Ceiling(total_count / (double)pageSize);

            return Ok(new
            {
                feed_items = feed_items.Select(m => new
                {
                    id = m.Id,
                    content = m.Content,
                    image = m.ImagePath != null ? $"{Request.Scheme}://{Request.Host}/uploads/{m.ImagePath}" : null,
                    timestamp = m.CreatedAt,
                    user = new
                    {
                        id = m.User.Id,
                        name = m.User.Name,
                        email = m.User.Email,
                        gravatar = $"https://secure.gravatar.com/avatar/{GetMd5Hash(m.User.Email?.ToLower() ?? "test@example.com")}?s=50"
                    }
                }),
                total_count,
                following,
                followers,
                micropost,
                gravatar = $"https://secure.gravatar.com/avatar/{gravatar_id}?s=80",
                totalUsers,
                totalPages,
                currentPage = page
            });
        }

        private static string GetMd5Hash(string input)
        {
            using (var md5 = System.Security.Cryptography.MD5.Create())
            {
                var inputBytes = Encoding.ASCII.GetBytes(input);
                var hashBytes = md5.ComputeHash(inputBytes);
                return string.Concat(hashBytes.Select(b => b.ToString("x2")));
            }
        }
    }
}
