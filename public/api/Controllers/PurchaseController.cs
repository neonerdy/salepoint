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
    public class PurchaseController : Controller
    {
        private AppDbContext context;
        public PurchaseController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {   
            var purchases = await context.Purchases
                .Include(p=>p.Supplier)
                .Select(p=>new {
                    p.ID,
                    p.PurchaseCode,
                    SupplierName = p.Supplier.SupplierName,
                    p.PurchaseDate,
                    p.Total,
                    p.Status,
                    p.CreatedDate,
                })
                .OrderByDescending(p=>p.CreatedDate)
                .ToListAsync();
        
            return Ok(purchases);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var purchase = await context.Purchases
                .Include(p=>p.Supplier)
                .Include(p=>p.PurchaseItems).ThenInclude(p=>p.Product)
                .Where(p=>p.ID == id)
                .Select(p=>new {
                    p.ID,
                    p.PurchaseCode,
                    SupplierId = p.SupplierId,
                    SupplierName = p.Supplier.SupplierName,
                    SupplierAddress = p.Supplier.Address,
                    SupplierCity = p.Supplier.City,
                    SupplierPhone = p.Supplier.Phone,
                    p.PurchaseDate,
                    p.SupplierInvoice,
                    p.PaymentTypeId,
                    p.PaymentAccountId,
                    p.Notes,
                    p.Amount,
                    p.Tax,
                    p.ServiceCharge,
                    p.Total,
                    p.Status,
                    p.CreatedDate,
                    p.ModifiedDate,
                    purchaseItems = p.PurchaseItems.Select(pi=> new {
                        pi.ID,
                        pi.PurchaseId,
                        pi.ProductId,
                        ProductName = pi.Product.ProductName,
                        pi.Qty,
                        pi.Price
                    })                  
                  })
                .SingleOrDefaultAsync();
            
            return Ok(purchase);
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Purchase purchase)
        {
            purchase.CreatedDate = DateTime.Now;
            purchase.ModifiedDate = DateTime.Now;
            
            context.Add(purchase);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Purchase purchase)
        {
            purchase.ModifiedDate = DateTime.Now;
            context.Update(purchase);
            
            //var purchaseItems = await context.PurchaseItems.Where(pi=>pi.PurchaseId == purchase.ID).ToListAsync();
            //context.RemoveRange(purchaseItems);
            
            context.Database.ExecuteSqlCommand("DELETE FROM purchase_items WHERE purchase_id = '" + purchase.ID + "'");

            foreach(var pi in purchase.PurchaseItems) {
                context.Add(pi);
            }

            var result = await context.SaveChangesAsync();

            return Ok(result);
        }



        [HttpGet("{id}/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status)
        {

            var purchase = await context.Purchases.FindAsync(id);
            purchase.Status = status;
            context.Update(purchase);     

            var result = await context.SaveChangesAsync();

            return Ok(result);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var purchase = await context.Purchases.FindAsync(id);
            context.Remove(purchase);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


    
    }



}