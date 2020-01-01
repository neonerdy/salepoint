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
    public class OutletController : Controller
    {
        private AppDbContext context;
        public OutletController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var outlets = await context.Outlets
                .Include(o=>o.OutletEmployees)
                .Select(o=>new {
                    o.ID,
                    o.OutletName,
                    o.Address,
                    o.Phone,
                    o.City,
                    o.Province,
                    OutletEmployees =  o.OutletEmployees.Select(oe=> new {
                        oe.ID,
                        oe.OutletId,
                        oe.EmployeeId,
                        EmployeeName = oe.Employee.EmployeeName,
                        Photo = oe.Employee.Photo
                    })                  
                })
                .OrderBy(o=>o.OutletName)
                .ToListAsync();
            
            return Ok(outlets);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var outlet = await context.Outlets
                .Select(o=>new {
                    o.ID,
                    o.OutletName,
                    o.Address,
                    o.Phone,
                    o.City,
                    o.Province,
                    o.Manager,
                    o.OpeningDate,
                    OutletEmployees =  o.OutletEmployees.Select(oe=> new {
                        oe.ID,
                        oe.OutletId,
                        oe.EmployeeId,
                        EmployeeName = oe.Employee.EmployeeName,
                        Photo = oe.Employee.Photo
                    })                  
                })
                .Where(o=>o.ID == id).SingleOrDefaultAsync();
               
            return Ok(outlet);
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Outlet outlet) 
        {
            context.Add(outlet);

            var result = await context.SaveChangesAsync();
            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Outlet outlet) 
        {
            context.Update(outlet);
            context.Database.ExecuteSqlCommand("DELETE FROM outlet_employees WHERE outlet_id = '" + outlet.ID + "'");

            //var employees = await context.OutletEmployees.Where(e=>e.OutletId == outlet.ID).ToListAsync();
            //context.RemoveRange(employees);

            foreach(var oe in outlet.OutletEmployees) {
                context.Add(oe);
            }
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }
        

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var outlet = await context.Outlets.FindAsync(id);
            context.Remove(outlet);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }

        


    }
}
