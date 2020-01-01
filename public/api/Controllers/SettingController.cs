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
    public class SettingController : Controller
    {
        private AppDbContext context;
        
        public SettingController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var settings = await context.Settings.ToListAsync();
            return Ok(settings);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var setting = await context.Settings.FindAsync(id);
            return Ok(setting);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Setting setting)
        {
            setting.ID = Guid.NewGuid();
            context.Add(setting);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Setting setting)
        {
            context.Update(setting);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var setting = await context.JobTitles.FindAsync(id);
            context.Remove(setting);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }






    }



}
