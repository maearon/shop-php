using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace DotNetBoilerplate.Controllers
{
    [Route("")]
    [ApiController]
    [AllowAnonymous]
    public class HealthCheckController : ControllerBase
    {
        [HttpGet("up"), HttpHead("up")]
        public IActionResult Status()
        {
            return Ok(new { status = "ok", timestamp = DateTime.UtcNow });
        }
    }
}
