using DotNetBoilerplate.Data;
using DotNetBoilerplate.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetBoilerplate.Controllers
{
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UsersController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Identity.Application")]
        public async Task<IActionResult> Index(int page = 1)
        {
            int pageSize = 10;
            var users = await _userManager.Users
                .OrderBy(u => u.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalUsers = await _userManager.Users.CountAsync();
            ViewBag.TotalPages = (int)Math.Ceiling(totalUsers / (double)pageSize);
            ViewBag.CurrentPage = page;

            return View(users);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Show(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var microposts = await _context.Microposts
                .Where(m => m.UserId == id)
                .OrderByDescending(m => m.CreatedAt)
                .Take(30)
                .ToListAsync();

            ViewBag.User = user;
            ViewBag.MicropostsCount = await _context.Microposts.Where(m => m.UserId == id).CountAsync();
            ViewBag.FollowingCount = await _context.Relationships.Where(r => r.FollowerId == id).CountAsync();
            ViewBag.FollowersCount = await _context.Relationships.Where(r => r.FollowedId == id).CountAsync();

            // Check if current user is following this user
            if (_signInManager.IsSignedIn(User))
            {
                var currentUser = await _userManager.GetUserAsync(User);
                if (currentUser != null && currentUser.Id != id)
                {
                    ViewBag.IsFollowing = await _context.Relationships
                        .AnyAsync(r => r.FollowerId == currentUser.Id && r.FollowedId == id);
                }
            }

            return View((user, microposts));
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser.Id == id)
            {
                TempData["ErrorMessage"] = "You cannot delete your own account.";
                return RedirectToAction(nameof(Index));
            }

            await _userManager.DeleteAsync(user);
            TempData["StatusMessage"] = "User deleted successfully.";
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Following(string id, int page = 1)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            int pageSize = 10;
            var followingIds = await _context.Relationships
                .Where(r => r.FollowerId == id)
                .Select(r => r.FollowedId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var following = await _userManager.Users
                .Where(u => followingIds.Contains(u.Id))
                .ToListAsync();

            var totalFollowing = await _context.Relationships
                .Where(r => r.FollowerId == id)
                .CountAsync();

            ViewBag.User = user;
            ViewBag.Title = "Following";
            ViewBag.TotalPages = (int)Math.Ceiling(totalFollowing / (double)pageSize);
            ViewBag.CurrentPage = page;
            ViewBag.MicropostsCount = await _context.Microposts.Where(m => m.UserId == id).CountAsync();
            ViewBag.FollowingCount = totalFollowing;
            ViewBag.FollowersCount = await _context.Relationships.Where(r => r.FollowedId == id).CountAsync();

            return View("ShowFollow", following);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Followers(string id, int page = 1)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            int pageSize = 10;
            var followerIds = await _context.Relationships
                .Where(r => r.FollowedId == id)
                .Select(r => r.FollowerId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var followers = await _userManager.Users
                .Where(u => followerIds.Contains(u.Id))
                .ToListAsync();

            var totalFollowers = await _context.Relationships
                .Where(r => r.FollowedId == id)
                .CountAsync();

            ViewBag.User = user;
            ViewBag.Title = "Followers";
            ViewBag.TotalPages = (int)Math.Ceiling(totalFollowers / (double)pageSize);
            ViewBag.CurrentPage = page;
            ViewBag.MicropostsCount = await _context.Microposts.Where(m => m.UserId == id).CountAsync();
            ViewBag.FollowingCount = await _context.Relationships.Where(r => r.FollowerId == id).CountAsync();
            ViewBag.FollowersCount = totalFollowers;

            return View("ShowFollow", followers);
        }
    }
}
