using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace OrderService.Models.ViewModels
{
    public class MicropostViewModel
    {
        [Required]
        [StringLength(140, ErrorMessage = "The {0} must be at most {1} characters long.")]
        public string Content { get; set; } = string.Empty;

        [Display(Name = "Image")]
        public IFormFile? Image { get; set; }
    }
}
