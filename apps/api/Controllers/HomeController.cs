using AdidasApi.Data;
using AdidasApi.Models;
using AdidasApi.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace AdidasApi.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public HomeController(
            ILogger<HomeController> logger,
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Index()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var user = await _userManager.GetUserAsync(User);
                if (user != null)
                {
                    var microposts = await GetFeedForUser(user.Id);
                    var micropostViewModel = new MicropostViewModel();
                    
                    ViewBag.CurrentUser = user;
                    ViewBag.MicropostsCount = await _context.Microposts.Where(m => m.UserId == user.Id).CountAsync();
                    ViewBag.FollowingCount = await _context.Relationships.Where(r => r.FollowerId == user.Id).CountAsync();
                    ViewBag.FollowersCount = await _context.Relationships.Where(r => r.FollowedId == user.Id).CountAsync();
                    
                    return View("IndexWithFeed", (microposts, micropostViewModel));
                }
            }
            
            return View();
        }

        private async Task<List<Micropost>> GetFeedForUser(string userId)
        {
            // Get IDs of users that the current user follows
            var followingIds = await _context.Relationships
                .Where(r => r.FollowerId == userId)
                .Select(r => r.FollowedId)
                .ToListAsync();
            
            // Add the current user's ID to include their own posts
            followingIds.Add(userId);
            
            // Get microposts from the user and followed users, ordered by creation time
            return await _context.Microposts
                .Include(m => m.User)
                .Where(m => followingIds.Contains(m.UserId))
                .OrderByDescending(m => m.CreatedAt)
                .Take(30) // Limit to 30 posts
                .ToListAsync();
        }

        public IActionResult Help()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }

    public class ErrorViewModel
    {
        public string? RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
