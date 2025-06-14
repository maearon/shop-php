using DotNetBoilerplate.Data;
using DotNetBoilerplate.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Security.Claims;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DotNetBoilerplate.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/users
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUsers(int page = 1, int pageSize = 10)
        {
            var users = await _userManager.Users
                .OrderBy(u => u.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.CreatedAt,
                    u.UpdatedAt,
                    MicropostsCount = _context.Microposts.Count(m => m.UserId == u.Id),
                    FollowingCount = _context.Relationships.Count(r => r.FollowerId == u.Id),
                    FollowersCount = _context.Relationships.Count(r => r.FollowedId == u.Id)
                })
                .ToListAsync();

            var totalUsers = await _userManager.Users.CountAsync();
            var totalPages = (int)Math.Ceiling(totalUsers / (double)pageSize);

            return Ok(new
            {
                Users = users,
                TotalUsers = totalUsers,
                TotalPages = totalPages,
                CurrentPage = page
            });
        }

        // PATCH: api/users/{id}
        [HttpPatch("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto model)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (currentUserId != id)
            {
                return Forbid(); // Chỉ cho phép người dùng tự cập nhật chính họ
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Cập nhật tên và email nếu có
            if (!string.IsNullOrWhiteSpace(model.name))
            {
                user.Name = model.name;
            }

            if (!string.IsNullOrWhiteSpace(model.email) && model.email != user.Email)
            {
                var existingUser = await _userManager.FindByEmailAsync(model.email);
                if (existingUser != null && existingUser.Id != user.Id)
                {
                    return BadRequest(new { error = "Email đã được sử dụng." });
                }

                user.Email = model.email;
                user.UserName = model.email; // Nếu bạn dùng email làm username
            }

            // Cập nhật mật khẩu nếu có và xác nhận đúng
            if (!string.IsNullOrWhiteSpace(model.password))
            {
                if (model.password != model.password_confirmation)
                {
                    return BadRequest(new { error = "Mật khẩu xác nhận không khớp." });
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var passwordResult = await _userManager.ResetPasswordAsync(user, token, model.password);
                if (!passwordResult.Succeeded)
                {
                    return BadRequest(new { error = passwordResult.Errors.Select(e => e.Description) });
                }
            }

            user.UpdatedAt = DateTime.UtcNow;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { error = result.Errors.Select(e => e.Description) });
            }

            return Ok(new
            {
                user.Id,
                user.Name,
                user.Email,
                message = "Cập nhật thành công."
            });
        }

        // GET: api/users/{id}
        // [HttpGet("{id}")]
        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        // public async Task<IActionResult> GetUser(string id)
        // {
        //     var user = await _userManager.FindByIdAsync(id);
        //     if (user == null)
        //     {
        //         return NotFound();
        //     }

        //     var micropostsCount = await _context.Microposts.CountAsync(m => m.UserId == id);
        //     var followingCount = await _context.Relationships.CountAsync(r => r.FollowerId == id);
        //     var followersCount = await _context.Relationships.CountAsync(r => r.FollowedId == id);

        //     return Ok(new
        //     {
        //         user.Id,
        //         user.Name,
        //         user.Email,
        //         user.CreatedAt,
        //         user.UpdatedAt,
        //         MicropostsCount = micropostsCount,
        //         FollowingCount = followingCount,
        //         FollowersCount = followersCount
        //     });
        // }
        [HttpGet("{id}/edit")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserEdit()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(currentUserId);
            if (user == null)
            {
                return NotFound();
            }
            var gravatarId = GetMd5Hash(user.Email.ToLower());
            return Ok(new
            {
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                },
                gravatar = $"https://secure.gravatar.com/avatar/{gravatarId}?s=80"
            });
        }
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUser(string id, int page = 1, int pageSize = 10)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var microposts = await _context.Microposts
                .Where(m => m.UserId == id)
                .OrderByDescending(m => m.CreatedAt)
                .Skip((page - 1) * pageSize)
                .ToListAsync();

            var micropostsCount = microposts.Count;
            var followingCount = await _context.Relationships.CountAsync(r => r.FollowerId == id);
            var followersCount = await _context.Relationships.CountAsync(r => r.FollowedId == id);

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isFollowing = false;
            if (currentUserId != null)
            {
                isFollowing = await _context.Relationships
                    .AnyAsync(r => r.FollowerId == currentUserId && r.FollowedId == id);
            }

            var userJson = new
            {
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email,
                    gravatar_id = GetMd5Hash(user.Email.ToLower()),
                    size = 50,
                    following = followingCount,
                    followers = followersCount,
                    current_user_following_user = isFollowing
                },
                microposts = microposts.Select(i => new
                {
                    id = i.Id,
                    user_name = user.Name,
                    user_id = i.UserId,
                    gravatar_id = GetMd5Hash(user.Email.ToLower()),
                    size = 50,
                    content = i.Content,
                    image = i.ImagePath != null
                        ? $"{Request.Scheme}://{Request.Host}{i.ImagePath}"
                        : null,
                    timestamp = TimeAgo(i.CreatedAt)
                }),
                total_count = micropostsCount
            };

            return Ok(userJson);
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

        // Optional: time_ago like Rails
        private static string TimeAgo(DateTime dt)
        {
            var span = DateTime.UtcNow - dt;
            if (span.TotalMinutes < 1) return "just now";
            if (span.TotalMinutes < 60) return $"{(int)span.TotalMinutes} minutes ago";
            if (span.TotalHours < 24) return $"{(int)span.TotalHours} hours ago";
            if (span.TotalDays < 30) return $"{(int)span.TotalDays} days ago";
            if (span.TotalDays < 365) return $"{(int)(span.TotalDays / 30)} months ago";
            return $"{(int)(span.TotalDays / 365)} years ago";
        }

        // GET: api/users/{id}/microposts
        [HttpGet("{id}/microposts")]
        public async Task<IActionResult> GetUserMicroposts(string id, int page = 1, int pageSize = 10)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var microposts = await _context.Microposts
                .Where(m => m.UserId == id)
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
                        user.Id,
                        user.Name,
                        user.Email
                    }
                })
                .ToListAsync();

            var totalMicroposts = await _context.Microposts.CountAsync(m => m.UserId == id);
            var totalPages = (int)Math.Ceiling(totalMicroposts / (double)pageSize);
            // var micropostsCount = microposts.Count;
            // var followingCount = await _context.Relationships.CountAsync(r => r.FollowerId == id);
            // var followersCount = await _context.Relationships.CountAsync(r => r.FollowedId == id);

            return Ok(new
            {
                Microposts = microposts,
                TotalMicroposts = totalMicroposts,
                TotalPages = totalPages,
                CurrentPage = page
            });
        }

        // GET: api/users/{id}/following
        [HttpGet("{id}/following")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserFollowing(string id, int page = 1, int pageSize = 10)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var followingIds = await _context.Relationships
                .Where(r => r.FollowerId == id)
                .Select(r => r.FollowedId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var users = await _userManager.Users
                .Where(u => followingIds.Contains(u.Id))
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.CreatedAt,
                    u.UpdatedAt
                })
                .ToListAsync();
            var microposts = await _context.Microposts
                .Where(m => m.UserId == id)
                .OrderByDescending(m => m.CreatedAt)
                // .Skip((page - 1) * pageSize)
                .ToListAsync();

            var micropost = microposts.Count;
            var following = await _context.Relationships.CountAsync(r => r.FollowerId == id);
            var followers = await _context.Relationships.CountAsync(r => r.FollowedId == id);
            var totalPages = (int)Math.Ceiling(following / (double)pageSize);

            return Ok(new
            {
                users,
                total_count = following,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    following,
                    followers,
                    micropost
                },
                TotalPages = totalPages,
                CurrentPage = page
            });
        }

        // GET: api/users/{id}/followers
        [HttpGet("{id}/followers")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserFollowers(string id, int page = 1, int pageSize = 10)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var followerIds = await _context.Relationships
                .Where(r => r.FollowedId == id)
                .Select(r => r.FollowerId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var users = await _userManager.Users
                .Where(u => followerIds.Contains(u.Id))
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.CreatedAt,
                    u.UpdatedAt
                })
                .ToListAsync();
            var microposts = await _context.Microposts
                .Where(m => m.UserId == id)
                .OrderByDescending(m => m.CreatedAt)
                // .Skip((page - 1) * pageSize)
                .ToListAsync();

            var micropost = microposts.Count;
            var following = await _context.Relationships.CountAsync(r => r.FollowerId == id);
            var followers = await _context.Relationships.CountAsync(r => r.FollowedId == id);
            var totalPages = (int)Math.Ceiling(followers / (double)pageSize);


            return Ok(new
            {
                users,
                total_count = followers,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    following,
                    followers,
                    micropost
                },
                TotalPages = totalPages,
                CurrentPage = page
            });
        }
        
        public class UpdateUserDto
        {
            [Required]
            [StringLength(50, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 3)]
            public string name { get; set; } = string.Empty;

            [Required]
            [EmailAddress]
            public string email { get; set; } = string.Empty;

            [Required]
            [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
            public string password { get; set; } = string.Empty;

            [Compare("password", ErrorMessage = "The password and confirmation password do not match.")]
            public string password_confirmation { get; set; } = string.Empty;
        }
    }
}
