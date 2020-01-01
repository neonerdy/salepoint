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
    public class SalesController : Controller
    {
        private AppDbContext context;
        public SalesController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            var sales = await context.Sales
                .Include(s=>s.Customer)
                .Select(s=>new {
                    s.ID,
                    s.InvoiceCode,
                    CustomerName = s.Customer.CustomerName,
                    s.InvoiceDate,
                    s.Total,
                    s.Status,
                    s.CreatedDate,
                 })
                .OrderByDescending(so=>so.CreatedDate)
                .ToListAsync();
            

            return Ok(sales);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var sales = await context.Sales
                .Include(s=>s.Outlet)
                .Include(s=>s.Customer)
                .Include(s=>s.SalesItems).ThenInclude(s=>s.Product)
                .Select(s=>new {
                    s.ID,
                    s.OutletId,
                    OutletName = s.Outlet.OutletName,
                    OutletAddress = s.Outlet.Address,
                    OutletCity = s.Outlet.City,
                    OutletPhone = s.Outlet.Phone,
                    s.InvoiceCode,
                    s.CustomerId,
                    CustomerName = s.Customer.CustomerName,
                    CustomerAddress = s.Customer.Address,
                    CustomerCity = s.Customer.City,
                    CustomerPhone = s.Customer.Phone,
                    s.InvoiceDate,
                    s.CustomerPO,
                    s.Notes,
                    s.PaymentTypeId,
                    s.Amount,
                    s.Tax,
                    s.ServiceCharge,
                    s.SubTotal,
                    s.Total,
                    s.Status,
                    s.CreatedDate,
                    s.ModifiedDate,
                    salesItems =  s.SalesItems.Select(si=>new
                     {
                            si.ID,
                            si.SalesId,
                            si.ProductId,
                            ProductName = si.Product.ProductName,
                            si.Qty,
                            si.Price
                    })
                 })
                .Where(so=>so.ID == id)
                .SingleOrDefaultAsync();
            
            return Ok(sales);
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Sales sales)
        {
            sales.CreatedDate = DateTime.Now;
            sales.ModifiedDate = DateTime.Now;

            context.Sales.Add(sales);

            /* 
            foreach(var salesItem in sales.SalesItems) 
            {
                //add sale items
                context.SalesItems.Add(salesItem);

                //update product stock

                //var productId = salesItem.ProductId;
                //var product = await context.Products.FindAsync(productId);
                //product.Stock = product.Stock - salesItem.Qty;

                //context.Products.Update(product);
            }
           */
           

            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Sales sales)
        {
            sales.ModifiedDate = DateTime.Now;
            context.Update(sales);

            //var salesItems = await context.SalesItems.Where(si=>si.SalesId == sales.ID).ToListAsync();
            //context.RemoveRange(salesItems);
           
            context.Database.ExecuteSqlCommand("DELETE FROM sale_items WHERE sales_id = '" + sales.ID + "'");

            foreach(var si in sales.SalesItems) {
                context.Add(si);
            }
         
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }
        


        [HttpGet("{id}/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status)
        {

            var sales = await context.Sales.FindAsync(id);
            sales.Status = status;
            context.Update(sales);     

            var result = await context.SaveChangesAsync();

            return Ok(result);
        }

       


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var sales = await context.Sales.FindAsync(id);
            context.Remove(sales);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }







    }



}