using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SalePointAPI.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace SalePointAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PurchaseInvoiceController : ControllerBase
    {

        private readonly ILogger<PurchaseInvoiceController> logger;
        private AppDbContext context;
        private const string SETTING_ID="E8DC5367-D553-4232-E621-08D84993E0DB";

        public PurchaseInvoiceController(ILogger<PurchaseInvoiceController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpPost]
        public async Task<IActionResult> GetTotalPurchase([FromBody] DateRangeViewModel dateRange)
        {
            try
            {
                var totalPurchase = context.PurchaseInvoices
                     .Where(pi=>pi.InvoiceDate.Date >= dateRange.StartDate.Date && pi.InvoiceDate.Date <= dateRange.EndDate.Date)
                     .Sum(e=>e.Amount);  

                return Ok(totalPurchase);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();    
        }



        [HttpPost()]
        public async Task<IActionResult> GetByDate([FromBody] DateRangeViewModel dateRange)
        {   
            try
            {
                var purchaseInvoices = await context.PurchaseInvoices
                    .Include(pi=>pi.Supplier)
                    .Select(pi=>new {
                        pi.ID,
                        pi.InvoiceCode,
                        SupplierName = pi.Supplier.SupplierName,
                        pi.InvoiceDate,
                        pi.Total,
                        pi.AmountPaid,
                        pi.Status,
                        pi.CreatedDate,
                    })
                    .Where(pi=>pi.InvoiceDate.Date >= dateRange.StartDate.Date && pi.InvoiceDate.Date <= dateRange.EndDate.Date)
                    .OrderByDescending(pi=>pi.InvoiceDate)
                    .ToListAsync();
            
                return Ok(purchaseInvoices);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();

        }





        [HttpPost()]
        public async Task<IActionResult> GetBySearch([FromBody] SearchViewModel search)
        {   
            try
            {
                var purchaseInvoices = await context.PurchaseInvoices
                    .Include(pi=>pi.Supplier)
                    .Select(pi=>new {
                        pi.ID,
                        pi.InvoiceCode,
                        SupplierName = pi.Supplier.SupplierName,
                        pi.InvoiceDate,
                        pi.Total,
                        pi.AmountPaid,
                        pi.Status,
                        pi.CreatedDate,
                    })
                    .Where(pi=>(pi.InvoiceDate.Date >= search.StartDate.Date && pi.InvoiceDate.Date <= search.EndDate.Date))
                    .Where(pi=>pi.InvoiceCode.Contains(search.Keyword) || pi.SupplierName.Contains(search.Keyword) || pi.Status.Contains(search.Keyword))
                    .OrderByDescending(pi=>pi.InvoiceDate)
                    .ToListAsync();
            
                return Ok(purchaseInvoices);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();

        }


        
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {

            try
            {
                var purchaseInvoice = await context.PurchaseInvoices
                    .Include(pi=>pi.Supplier)
                    .Include(pi=>pi.PurchaseInvoiceItems).ThenInclude(pi=>pi.Product)
                    .Where(pi=>pi.ID == id)
                    .Select(pi=>new {
                        pi.ID,
                        pi.InvoiceCode,
                        SupplierId = pi.SupplierId,
                        SupplierName = pi.Supplier.SupplierName,
                        SupplierAddress = pi.Supplier.Address,
                        SupplierCity = pi.Supplier.City,
                        SupplierPhone = pi.Supplier.Phone,
                        pi.InvoiceDate,
                        pi.DueDate,
                        pi.Notes,
                        pi.Amount,
                        pi.AmountPaid,
                        pi.Tax,
                        pi.Discount,
                        pi.Total,
                        pi.Status,
                        pi.CreatedDate,
                        pi.ModifiedDate,
                        purchaseInvoiceItems = pi.PurchaseInvoiceItems.Select(pii=> new {
                            pii.ID,
                            pii.PurchaseInvoiceId,
                            pii.ProductId,
                            ProductName = pii.Product.ProductName,
                            pii.Qty,
                            pii.Price,
                            pii.TaxPct,
                            pii.DiscountPct
                        })                  
                    })
                    .SingleOrDefaultAsync();
                
                return Ok(purchaseInvoice);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpPost()]
        public async Task<IActionResult> GetBySupplier([FromBody] SearchViewModel search)
        {   
            try
            {
                List<PurchaseInvoiceViewModel> purchaseInvoices = new List<PurchaseInvoiceViewModel>();

                string condition = string.Empty;
        
                if (!string.IsNullOrEmpty(search.Keyword)) 
                {
                    condition = "WHERE (pi.InvoiceDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND pi.InvoiceDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "' "
                            + ") AND (s.ID = '" + search.Keyword + "')";  
                } 
                else
                {
                    condition = "WHERE pi.InvoiceDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND pi.InvoiceDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "'";
                }

                string sql = "SELECT  pi.ID, pi.InvoiceCode,s.SupplierName, pi.InvoiceDate, pi.DueDate,"
                    + "pi.Total, pi.AmountPaid, pi.Status FROM PurchaseInvoices pi "
                    + "INNER JOIN Suppliers s ON pi.SupplierId = s.ID "
                    + condition;
                          
                using (var command = context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = sql;
                    context.Database.OpenConnection();
                 
                    using (var rdr = await command.ExecuteReaderAsync())
                    {
                        while(rdr.Read())
                        {
                            var pi = new PurchaseInvoiceViewModel();
                         
                            pi.ID = new Guid(rdr["ID"].ToString());
                            pi.InvoiceCode = rdr["InvoiceCode"].ToString();
                            pi.SupplierName = rdr["SupplierName"].ToString();
                            pi.InvoiceDate = Convert.ToDateTime(rdr["InvoiceDate"]);
                            pi.DueDate = Convert.ToDateTime(rdr["DueDate"]);
                            pi.Total = Convert.ToDecimal(rdr["Total"]);
                            pi.AmountPaid = Convert.ToDecimal(rdr["AmountPaid"]);
                            pi.Status = rdr["Status"].ToString();

                            purchaseInvoices.Add(pi);
                        }
                    }

                } 
        
                return Ok(purchaseInvoices);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpPost()]
        public async Task<IActionResult> GetByCategory([FromBody] SearchViewModel search)
        {   
            try
            {
                List<PurchaseInvoiceViewModel> purchaseInvoices = new List<PurchaseInvoiceViewModel>();

                string condition = string.Empty;
        
                if (!string.IsNullOrEmpty(search.Keyword)) 
                {
                    condition = "WHERE (pi.InvoiceDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND pi.InvoiceDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "' "
                            + ") AND (pc.ID = '" + search.Keyword + "')";  
                } 
                else
                {
                    condition = "WHERE pi.InvoiceDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND pi.InvoiceDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "'";
                }

                string sql = "SELECT  pi.ID, pi.InvoiceCode,s.SupplierName, pi.InvoiceDate, pi.DueDate,"
                    + "pi.Total, pi.AmountPaid, pi.Status FROM PurchaseInvoices pi "
                    + "INNER JOIN Suppliers s ON pi.SupplierId = s.ID "
                    + "LEFT JOIN PurchaseInvoiceItems pii ON pii.PurchaseInvoiceId = pi.ID "
                    + "LEFT JOIN Products p ON p.ID = pii.ProductId "
                    + "LEFT JOIN ProductCategories pc ON pc.ID = p.CategoryId "
                    + condition 
                    + " GROUP BY pi.ID, pi.InvoiceCode,s.SupplierName, pi.InvoiceDate, pi.DueDate,"
                    + "pi.Total, pi.AmountPaid, pi.Status"; 

                using (var command = context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = sql;
                    context.Database.OpenConnection();
                 
                    using (var rdr = await command.ExecuteReaderAsync())
                    {
                        while(rdr.Read())
                        {
                            var pi = new PurchaseInvoiceViewModel();
                         
                            pi.ID = new Guid(rdr["ID"].ToString());
                            pi.InvoiceCode = rdr["InvoiceCode"].ToString();
                            pi.SupplierName = rdr["SupplierName"].ToString();
                            pi.InvoiceDate = Convert.ToDateTime(rdr["InvoiceDate"]);
                            pi.DueDate = Convert.ToDateTime(rdr["DueDate"]);
                            pi.Total = Convert.ToDecimal(rdr["Total"]);
                            pi.AmountPaid = Convert.ToDecimal(rdr["AmountPaid"]);
                            pi.Status = rdr["Status"].ToString();

                            purchaseInvoices.Add(pi);
                        }
                    }

                } 
        
                return Ok(purchaseInvoices);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PurchaseInvoice purchaseInvoice)
        {
            int result = 0;
            try
            {
                purchaseInvoice.CreatedDate = DateTime.Now;
                purchaseInvoice.ModifiedDate = DateTime.Now;
                context.Add(purchaseInvoice);

                //Update record counter

                var recordCounter = await context.RecordCounters.Where(rc=>rc.Month == DateTime.Now.Month 
                    && rc.Year == DateTime.Now.Year).SingleOrDefaultAsync();

                recordCounter.PurchaseInvoiceLastCounter = recordCounter.PurchaseInvoiceLastCounter + 1;     
                context.Update(recordCounter);
              
                //update stock 

                var setting = await context.Settings.FindAsync(new Guid(SETTING_ID));

                if (setting.IsEnableStockTracking)
                {
                    foreach(var pii in purchaseInvoice.PurchaseInvoiceItems) 
                    {
                        var product = await context.Products.Where(p=>p.ID == pii.ProductId).SingleOrDefaultAsync();
                        product.Stock = product.Stock - pii.Qty;
                        context.Update(product);
                    }
                }

                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());        
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PurchaseInvoice purchaseInvoice)
        {
            int result = 0;
            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    List<PurchaseInvoiceItem> items = purchaseInvoice.PurchaseInvoiceItems;
                  
                    purchaseInvoice.ModifiedDate = DateTime.Now;
                    context.Update(purchaseInvoice);
                    
                    var setting = await context.Settings.FindAsync(new Guid(SETTING_ID));

                    if (setting.IsEnableStockTracking)
                    {
                        using (var command = context.Database.GetDbConnection().CreateCommand())
                        {
                            command.CommandText = "SELECT ProductId, Qty FROM PurchaseInvoiceItems WHERE PurchaseInvoiceId = @PurchaseInvoiceId";
                            command.Transaction = context.Database.CurrentTransaction.GetDbTransaction();
                            context.Database.OpenConnection();

                            var param = command.CreateParameter();
                            param.ParameterName = "@PurchaseInvoiceId";
                            param.Value = purchaseInvoice.ID;
                            command.Parameters.Add(param);

                            List<ProductViewModel> productViewModels = new List<ProductViewModel>();

                            using (var rdr = command.ExecuteReader())
                            {
                                while(rdr.Read()) {

                                    var productId = new Guid(rdr["ProductId"].ToString());
                                    var qty = Convert.ToInt32(rdr["Qty"]);
                                    var pvm = new ProductViewModel();
                                    pvm.ProductId = productId;
                                    pvm.Qty = qty;

                                    productViewModels.Add(pvm);
                                }    
                            }

                            foreach(var pvm in productViewModels)
                            {
                                var product = await context.Products.Where(p=>p.ID == pvm.ProductId).SingleOrDefaultAsync();
                                product.Stock = product.Stock + pvm.Qty;
                                context.Update(product);
                            }
                    
                        }
                    }
                    
                    context.Database.ExecuteSqlRaw("DELETE FROM PurchaseInvoiceItems WHERE PurchaseInvoiceId = {0}" , 
                        new object[] { purchaseInvoice.ID });
 
                    foreach(var pii in items) 
                    {
                        context.Add(pii);
                        if (setting.IsEnableStockTracking)
                        {
                            var product = await context.Products.Where(p=>p.ID == pii.ProductId).SingleOrDefaultAsync();
                            product.Stock = product.Stock - pii.Qty;
                            context.Update(product);
                        }
                    }

                    result = await context.SaveChangesAsync();
                    transaction.Commit();

                }
                catch(Exception ex)
                {
                    logger.LogError(ex.ToString());
                    transaction.Rollback();
                }

            }

            return Ok(result);
        }




        [HttpGet("{id}/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status)
        {
            int result = 0;
            try
            {
                var purchaseInvoice = await context.PurchaseInvoices.Include(pi=>pi.PurchaseInvoiceItems)
                    .Where(pi=>pi.ID == id).SingleOrDefaultAsync();
               
                purchaseInvoice.Status = status;
                context.Update(purchaseInvoice);

                //Update Stock

                var setting = await context.Settings.FindAsync(new Guid(SETTING_ID));
                if (setting.IsEnableStockTracking)
                {
                    if (status == "Canceled")
                    {
                        foreach(var pii in purchaseInvoice.PurchaseInvoiceItems) 
                        {
                            if (setting.IsEnableStockTracking)
                            {
                                var product = await context.Products.Where(p=>p.ID == pii.ProductId).SingleOrDefaultAsync();
                                product.Stock = product.Stock + pii.Qty;
                                context.Update(product);
                            }
                        }
                    }
                }


                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            int result = 0;
            try
            {
                var purchaseInvoice = await context.PurchaseInvoices.FindAsync(id);

                context.Remove(purchaseInvoice);
                
                var purchaseInvoiceItems = await context.PurchaseInvoiceItems.Where(pii=> pii.PurchaseInvoiceId == id)
                    .ToListAsync();
                
                var purchasePayments = await context.PurchasePayments.Where(pp=>pp.PurchaseInvoiceId == id)
                    .ToListAsync();

                context.RemoveRange(purchaseInvoiceItems);
                context.RemoveRange(purchasePayments);

                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }





    }



}
