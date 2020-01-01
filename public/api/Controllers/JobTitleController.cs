using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalePointAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SalePointAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class JobTitleController : Controller
    {
        private AppDbContext context;
        
        public JobTitleController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var jobTitles = await context.JobTitles.ToListAsync();
            return Ok(jobTitles);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var jobTitle = await context.JobTitles.FindAsync(id);
            return Ok(jobTitle);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] JobTitle jobTitle)
        {
            jobTitle.ID = Guid.NewGuid();
            context.Add(jobTitle);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] JobTitle jobTitle)
        {
            context.Update(jobTitle);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var jobTitle = await context.JobTitles.FindAsync(id);
            context.Remove(jobTitle);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }






    }



}
