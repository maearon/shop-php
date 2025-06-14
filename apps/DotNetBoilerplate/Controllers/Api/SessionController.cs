using DotNetBoilerplate.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;

namespace DotNetBoilerplate.Controllers.Api
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class SessionController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public SessionController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET /api/session/me
        [HttpGet("me")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetCurrentUser()
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
            var gravatar_id = GetMd5Hash(user.Email.ToLower());
            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.Name, // or other custom fields
                gravatar = $"https://secure.gravatar.com/avatar/{gravatar_id}?s=80",
                gravatar_id,
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
