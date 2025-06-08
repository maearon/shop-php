using OrderService.Data;
using OrderService.Models;
using OrderService.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace OrderService.Controllers
{
    [Authorize]
    public class MicropostsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _hostEnvironment;

        public MicropostsController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _userManager = userManager;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(MicropostViewModel model)
        {
            if (!ModelState.IsValid)
            {
                TempData["ErrorMessage"] = "Invalid micropost data.";
                return RedirectToAction("Index", "Home");
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            var micropost = new Micropost
            {
                Content = model.Content,
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            if (model.Image != null)
            {
                // Process and save the image
                string uniqueFileName = ProcessUploadedFile(model.Image);
                micropost.ImagePath = uniqueFileName;
            }

            _context.Microposts.Add(micropost);
            await _context.SaveChangesAsync();

            TempData["StatusMessage"] = "Micropost created successfully!";
            return RedirectToAction("Index", "Home");
        }

        private string ProcessUploadedFile(IFormFile image)
        {
            string uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);
            
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }

            return uniqueFileName;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var micropost = await _context.Microposts.FindAsync((long)id);
            if (micropost == null)
            {
                return NotFound();
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            // Check if the current user is the owner of the micropost or an admin
            if (micropost.UserId != user.Id && !User.IsInRole("Admin"))
            {
                return Forbid();
            }

            // Delete the image if it exists
            if (!string.IsNullOrEmpty(micropost.ImagePath))
            {
                var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "uploads", micropost.ImagePath);
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            _context.Microposts.Remove(micropost);
            await _context.SaveChangesAsync();

            TempData["StatusMessage"] = "Micropost deleted successfully!";
            return RedirectToAction("Index", "Home");
        }
    }
}
