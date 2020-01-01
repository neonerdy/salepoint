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
    public class UserController : Controller
    {
        private AppDbContext context;
        
        public UserController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var loginUsers = await context.Users
                .Include(u=>u.Employee)
                .ToListAsync();
            
            return Ok(loginUsers);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var loginUser = await context.Users.FindAsync(id);
            return Ok(loginUser);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] User user)
        {
            user.ID = Guid.NewGuid();
            user.CreatedDate = DateTime.Now;
            user.ModifiedDate = DateTime.Now;
            context.Add(user);

            var result = await context.SaveChangesAsync();
            
            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] User user)
        {
            user.ModifiedDate = DateTime.Now;
            context.Update(user);
            var result = await context.SaveChangesAsync();
            
            return Ok(result);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await context.Users.FindAsync(id);
            context.Remove(user);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }



    }


}