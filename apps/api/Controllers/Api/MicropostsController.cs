using AdidasApi.Data;
using AdidasApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace AdidasApi.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MicropostsController : ControllerBase
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

        // GET: api/microposts
        [HttpGet]
        public async Task<IActionResult> GetMicroposts(int page = 1, int pageSize = 10)
        {
            var microposts = await _context.Microposts
                .Include(m => m.User)
                .OrderByDescending(m => m.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new
                {
                    m.Id,
                    m.Content,
                    m.ImagePath,
                    m.CreatedAt,
                    m.UpdatedAt,
                    User = new
                    {
                        m.User.Id,
                        m.User.Name,
                        m.User.Email
                    }
                })
                .ToListAsync();

            var totalMicroposts = await _context.Microposts.CountAsync();
            var totalPages = (int)Math.Ceiling(totalMicroposts / (double)pageSize);

            return Ok(new
            {
                Microposts = microposts,
                TotalMicroposts = totalMicroposts,
                TotalPages = totalPages,
                CurrentPage = page
            });
        }

        // GET: api/microposts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMicropost(int id)
        {
            var micropost = await _context.Microposts
                .Include(m => m.User)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (micropost == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                micropost.Id,
                micropost.Content,
                micropost.ImagePath,
                micropost.CreatedAt,
                micropost.UpdatedAt,
                User = new
                {
                    micropost.User.Id,
                    micropost.User.Name,
                    micropost.User.Email
                }
            });
        }

        // POST: api/microposts
        [HttpPost]
        // public async Task<IActionResult> CreateMicropost([FromForm] MicropostCreateDto model)
        public async Task<IActionResult> CreateMicropost()
        {
            Console.WriteLine("🔥 CreateMicropost called"); // THÊM DÒNG NÀY

            var form = Request.Form;

            Console.WriteLine("🔥 Form keys:");
Console.WriteLine("🔥 Form content keys:");
Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(form.Keys.ToArray()));

Console.WriteLine("🔥 Uploaded files:");
Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(form.Files.Select(f => new { f.Name, f.FileName, f.Length })));


Console.WriteLine("🔥 Uploaded files:");
foreach (var file in form.Files)
{
    Console.WriteLine($"🎯 File: {file.Name} - {file.FileName}");
}
            
            var content = form["micropost[content]"];
            // var image = form.Files.GetFile("image");
            var image = form.Files.GetFile("micropost[image]");
            foreach (var file in form.Files)
            {
                Console.WriteLine($"🔥 Received file: {file.Name} - {file.FileName}");
            }
            // if (!ModelState.IsValid)
            // {
            //     return BadRequest(ModelState);
            // }
            if (string.IsNullOrWhiteSpace(content))
            {
                // return BadRequest(new { errors =  { "Content": ["The Content field is required."] } });
                return BadRequest(new { error = "Content is required." });
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var micropost = new Micropost
            {
                // Content = model.Content,
                Content = content,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            if (image != null)
            {
                // Process and save the image
                string uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads");
                Console.WriteLine($"WebRootPath: {_hostEnvironment.WebRootPath}");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // using (var fileStream = new FileStream(filePath, FileMode.Create))
                // {
                //     await image.CopyToAsync(fileStream);
                // }
                try
                {
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"🔥 Failed to save file: {ex.Message}");
                    return StatusCode(500, new { error = "Failed to save file." });
                }

                micropost.ImagePath = uniqueFileName;
            }

            _context.Microposts.Add(micropost);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMicropost), new { id = micropost.Id }, new
            {
                micropost.Id,
                micropost.Content,
                micropost.ImagePath,
                micropost.CreatedAt,
                micropost.UpdatedAt,
                User = new
                {
                    user.Id,
                    user.Name,
                    user.Email
                }
            });
        }

        // DELETE: api/microposts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMicropost(long id)
        {
            var micropost = await _context.Microposts.FindAsync((long)id);
            if (micropost == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (micropost.UserId != userId && !User.IsInRole("Admin"))
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

            return NoContent();
        }
    }

    public class MicropostCreateDto
    {
        [Required]
        [StringLength(140, ErrorMessage = "The {0} must be at most {1} characters long.")]
        public string Content { get; set; } = string.Empty;

        public IFormFile? Image { get; set; }
    }
}
