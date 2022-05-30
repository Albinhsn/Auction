using ImageMicroservice.Models;
using ImageMicroservice.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Drawing;
using System.Net;
using System.Net.Http.Headers;

namespace ImageMicroservice.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ImageController : ControllerBase
    {

        private readonly ImageService _imageService;

        private readonly ImageConverter _imageConverter;
     
        
        public ImageController(ImageService imageService)
        {
            _imageService = imageService;

            _imageConverter = new ImageConverter();
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult AddImage()
        {
            try
            {
                IFormFile file = Request.Form.Files[0];
                
                if (file.Length > 0)
                {                   
                    string id = _imageService.saveImage(file).Result;
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }

            
        }

        [HttpDelete]
        public void DeleteImage()
        {

        }

        [HttpGet("/api/[controller]/{id}")]
        public async Task<IActionResult> GetImage(string id)
        {
            ImageFile imageFile = await _imageService.GetImage(id);            
            return File(imageFile.File, imageFile.FileType);
        }


    }
}
