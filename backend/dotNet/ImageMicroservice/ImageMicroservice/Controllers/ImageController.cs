using ImageMicroservice.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Drawing;
using System.Net;
using System.Net.Http.Headers;

namespace ImageMicroservice.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
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
                    ObjectId id = _imageService.saveImage(file).Result;
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

        [HttpGet("/xd")]
        public async Task<HttpResponseMessage> GetImage()
        {
            Byte[] b = await _imageService.GetImage("627d2b75456129648609cc01");
            //Bitmap bm = (Bitmap)_imageConverter.ConvertFrom(b);
            
            
            MemoryStream memoryStream = new MemoryStream(b);
            
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = Image.FromStream(memoryStream, true);
            
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");

            return response;

        }


    }
}
