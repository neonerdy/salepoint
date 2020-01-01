using System;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalePointAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SalePointAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class FileController : Controller
    {
        
        
        [HttpPost,DisableRequestSizeLimit]  
        public async Task<IActionResult> UploadFile(IFormFile file)  
        {  
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(),"Resources");

            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(pathToSave, fileName);
        
            using (var stream = new FileStream(fullPath, FileMode.Create))  
            {  
                await file.CopyToAsync(stream);  
            }  

        
            return Ok(new { fullPath });;  
        }

        

    }


}