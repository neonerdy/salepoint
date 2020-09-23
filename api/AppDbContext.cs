
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using SalePointAPI.Models;

namespace SalePointAPI
{
    public class AppDbContext : DbContext
    {
        
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; } 
        public DbSet<Unit> Units { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<PointOfSale> PointOfSales { get; set; }
        public DbSet<PointOfSalesItem> PointOfSaleItems { get; set; }
        public DbSet<SalesInvoice> SalesInvoices { get; set; }
        public DbSet<SalesInvoiceItem> SalesInvoiceItems { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<SalesPayment> SalesPayments { get; set; }
        public DbSet<PurchaseInvoice> PurchaseInvoices { get; set; }
        public DbSet<PurchaseInvoiceItem> PurchaseInvoiceItems { get; set; }
        public DbSet<PurchasePayment> PurchasePayments { get; set; }
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RoleAccess> RoleAccesses{ get; set; }
        public DbSet<RecordCounter> RecordCounters { get; set; }
        

       
        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
             optionBuilder.UseSqlServer("Server=ISID-ID-ARIYANT\\SQLEXPRESS2019;Database=SALEPOINT;Trusted_Connection=True");
        }
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Setting>(entity => 
            {
                entity.ToTable("Settings");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.CompanyName).HasColumnName("CompanyName");
                entity.Property(e => e.Address).HasColumnName("Address");
                entity.Property(e => e.City).HasColumnName("City");
                entity.Property(e => e.Province).HasColumnName("Province");
                entity.Property(e => e.ZipCode).HasColumnName("ZipCode");
                entity.Property(e => e.Phone).HasColumnName("Phone");
                entity.Property(e => e.Email).HasColumnName("Email");
                entity.Property(e => e.TaxPct).HasColumnName("TaxPct");
                entity.Property(e => e.DiscountPct).HasColumnName("DiscountPct");
                entity.Property(e => e.ServiceChargePct).HasColumnName("ServiceChargePct");
                entity.Property(e => e.IsEnableServiceCharge).HasColumnName("IsEnableServiceCharge");
                entity.Property(e => e.IsEnableAutomaticNumbering).HasColumnName("IsEnableAutomaticNumbering");
                entity.Property(e => e.IsShowMonthAndYear).HasColumnName("IsShowMonthAndYear");
                entity.Property(e => e.PointOfSalePrefix).HasColumnName("PointOfSalePrefix");
                entity.Property(e => e.SalesInvoicePrefix).HasColumnName("SalesInvoicePrefix");
                entity.Property(e => e.PurchaseInvoicePrefix).HasColumnName("PurchaseInvoicePrefix");
                entity.Property(e => e.Delimiter).HasColumnName("Delimiter");
                
            });


            modelBuilder.Entity<Role>(entity => 
            {
                entity.ToTable("Roles");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.RoleName).HasColumnName("RoleName");
                entity.Property(e => e.Description).HasColumnName("Description");
            });


            modelBuilder.Entity<Employee>(entity => 
            {
                entity.ToTable("Employees");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.EmployeeName).HasColumnName("EmployeeName");
                entity.Property(e => e.RoleId).HasColumnName("RoleId");
                entity.Property(e => e.JoinDate).HasColumnName("JoinDate");
                entity.Property(e => e.Address).HasColumnName("Address");
                entity.Property(e => e.City).HasColumnName("City");
                entity.Property(e => e.Phone).HasColumnName("Phone");
                entity.Property(e => e.Email).HasColumnName("Email");
                entity.Property(e => e.IsActive).HasColumnName("IsActive");
            });


            modelBuilder.Entity<Customer>(entity => 
            {
                entity.ToTable("Customers");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.CustomerName).HasColumnName("CustomerName");
                entity.Property(e => e.Address).HasColumnName("Address");
                entity.Property(e => e.City).HasColumnName("City");
                entity.Property(e => e.Province).HasColumnName("Province");
                entity.Property(e => e.ZipCode).HasColumnName("ZipCode");
                entity.Property(e => e.Phone).HasColumnName("Phone");
                entity.Property(e => e.Email).HasColumnName("Email");
                entity.Property(e => e.IsActive).HasColumnName("IsActive");
            });

  
            modelBuilder.Entity<Supplier>(entity => 
            {
                entity.ToTable("Suppliers");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.SupplierName).HasColumnName("SupplierName");
                entity.Property(e => e.Address).HasColumnName("Address");
                entity.Property(e => e.City).HasColumnName("City");
                entity.Property(e => e.Province).HasColumnName("Province");
                entity.Property(e => e.ZipCode).HasColumnName("ZipCode");
                entity.Property(e => e.Phone).HasColumnName("Phone");
                entity.Property(e => e.Email).HasColumnName("Email");
                entity.Property(e => e.ContactPerson).HasColumnName("ContactPerson");
                entity.Property(e => e.ContactPhone).HasColumnName("ContactPhone");
                entity.Property(e => e.IsActive).HasColumnName("IsActive");
            });

  
            modelBuilder.Entity<ProductCategory>(entity => 
            {
                entity.ToTable("ProductCategories");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.CategoryName).HasColumnName("CategoryName");
                entity.Property(e => e.Notes).HasColumnName("Notes");
            });

            modelBuilder.Entity<Unit>(entity => 
            {
                entity.ToTable("Units");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.UnitName).HasColumnName("UnitName");
                entity.Property(e => e.Description).HasColumnName("Description");
            });


            modelBuilder.Entity<Product>(entity => 
            {
                entity.ToTable("Products");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.ProductCode).HasColumnName("ProductCode");
                entity.Property(e => e.ProductName).HasColumnName("ProductName");
                entity.Property(e => e.CategoryId).HasColumnName("CategoryId");
                entity.Property(e => e.Brand).HasColumnName("Brand");
                entity.Property(e => e.Model).HasColumnName("Model");
                entity.Property(e => e.PurchasePrice).HasColumnName("PurchasePrice");
                entity.Property(e => e.SalePrice).HasColumnName("SalePrice");
                entity.Property(e => e.Stock).HasColumnName("Stock");
                entity.Property(e => e.UnitId).HasColumnName("UnitId");
                entity.Property(e => e.Description).HasColumnName("Description");
                entity.Property(e => e.IsStockTracking).HasColumnName("IsStockTracking");
                entity.Property(e => e.IsDiscontinued).HasColumnName("IsDiscontinued");
                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
                entity.Property(e => e.ModifiedDate).HasColumnName("ModifiedDate");
            });




            modelBuilder.Entity<PointOfSale>(entity => 
            {
                entity.ToTable("PointOfSales");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.SalesCode).HasColumnName("SalesCode");
                entity.Property(e => e.SalesDate).HasColumnName("SalesDate");
                entity.Property(e => e.CustomerId).HasColumnName("CustomerId");
                entity.Property(e => e.PaymentTypeId).HasColumnName("PaymentTypeId");
                entity.Property(e => e.CashierId).HasColumnName("CashierId");
                entity.Property(e => e.Notes).HasColumnName("Notes");
                entity.Property(e => e.Amount).HasColumnName("Amount");
                entity.Property(e => e.Tax).HasColumnName("Tax");
                entity.Property(e => e.Discount).HasColumnName("Discount");
                entity.Property(e => e.ServiceCharge).HasColumnName("ServiceCharge");
                entity.Property(e => e.Total).HasColumnName("Total");
                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
                entity.Property(e => e.ModifiedDate).HasColumnName("ModifiedDate");
            });



            modelBuilder.Entity<PointOfSalesItem>(entity => 
            {
                entity.ToTable("PointOfSaleItems");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.PointOfSaleId).HasColumnName("PointOfSaleId");
                entity.Property(e => e.ProductId).HasColumnName("ProductId");
                entity.Property(e => e.Qty).HasColumnName("Qty");
                entity.Property(e => e.Price).HasColumnName("Price");
                entity.Property(e => e.DiscountPct).HasColumnName("DiscountPct");
                entity.Property(e => e.TaxPct).HasColumnName("TaxPct");
            });



            modelBuilder.Entity<SalesInvoice>(entity => 
            {
                entity.ToTable("SalesInvoices");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.InvoiceCode).HasColumnName("InvoiceCode");
                entity.Property(e => e.CustomerId).HasColumnName("CustomerId");
                entity.Property(e => e.InvoiceDate).HasColumnName("InvoiceDate");
                entity.Property(e => e.DueDate).HasColumnName("DueDate");
                entity.Property(e => e.SalesPersonId).HasColumnName("SalesPersonId");
                entity.Property(e => e.Notes).HasColumnName("Notes");
                entity.Property(e => e.Amount).HasColumnName("Amount");
                entity.Property(e => e.Tax).HasColumnName("Tax");
                entity.Property(e => e.Discount).HasColumnName("Discount");
                entity.Property(e => e.Total).HasColumnName("Total");
                entity.Property(e => e.AmountPaid).HasColumnName("AmountPaid");
                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
                entity.Property(e => e.ModifiedDate).HasColumnName("ModifiedDate");
            });


            modelBuilder.Entity<SalesInvoiceItem>(entity => 
            {
                entity.ToTable("SalesInvoiceItems");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.SalesInvoiceId).HasColumnName("SalesInvoiceId");
                entity.Property(e => e.ProductId).HasColumnName("ProductId");
                entity.Property(e => e.Qty).HasColumnName("Qty");
                entity.Property(e => e.Price).HasColumnName("Price");
                entity.Property(e => e.TaxPct).HasColumnName("TaxPct");
                entity.Property(e => e.DiscountPct).HasColumnName("DiscountPct");
            });


             modelBuilder.Entity<PurchaseInvoice>(entity => 
            {
                entity.ToTable("PurchaseInvoices");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.InvoiceCode).HasColumnName("InvoiceCode");
                entity.Property(e => e.SupplierId).HasColumnName("SupplierId");
                entity.Property(e => e.InvoiceDate).HasColumnName("InvoiceDate");
                entity.Property(e => e.DueDate).HasColumnName("DueDate");
                entity.Property(e => e.Notes).HasColumnName("Notes");
                entity.Property(e => e.Amount).HasColumnName("Amount");
                entity.Property(e => e.Tax).HasColumnName("Tax");
                entity.Property(e => e.Discount).HasColumnName("Discount");
                entity.Property(e => e.Total).HasColumnName("Total");
                entity.Property(e => e.AmountPaid).HasColumnName("AmountPaid");
                entity.Property(e => e.Status).HasColumnName("Status");
                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
                entity.Property(e => e.ModifiedDate).HasColumnName("ModifiedDate");
            });


            modelBuilder.Entity<PurchaseInvoiceItem>(entity => 
            {
                entity.ToTable("PurchaseInvoiceItems");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.PurchaseInvoiceId).HasColumnName("PurchaseInvoiceId");
                entity.Property(e => e.ProductId).HasColumnName("ProductId");
                entity.Property(e => e.Qty).HasColumnName("Qty");
                entity.Property(e => e.Price).HasColumnName("Price");
                entity.Property(e => e.TaxPct).HasColumnName("TaxPct");
                entity.Property(e => e.DiscountPct).HasColumnName("DiscountPct");
            });


            modelBuilder.Entity<PaymentType>(entity => 
            {
                entity.ToTable("PaymentTypes");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.PaymentTypeName).HasColumnName("PaymentTypeName");
                entity.Property(e => e.Description).HasColumnName("Description");
            });




            modelBuilder.Entity<SalesPayment>(entity => 
            {
                entity.ToTable("SalesPayments");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.SalesInvoiceId).HasColumnName("SalesInvoiceId");
                entity.Property(e => e.PaymentDate).HasColumnName("PaymentDate");
                entity.Property(e => e.PaymentTypeId).HasColumnName("PaymentTypeId");
                entity.Property(e => e.AmountPaid).HasColumnName("AmountPaid");
                entity.Property(e => e.Notes).HasColumnName("Notes");
            });




             modelBuilder.Entity<PurchasePayment>(entity => 
            {
                entity.ToTable("PurchasePayments");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.PurchaseInvoiceId).HasColumnName("PurchaseInvoiceId");
                entity.Property(e => e.PaymentTypeId).HasColumnName("PaymentTypeId");
                entity.Property(e => e.PaymentDate).HasColumnName("PaymentDate");
                entity.Property(e => e.AmountPaid).HasColumnName("AmountPaid");
                entity.Property(e => e.Notes).HasColumnName("Notes");
            });


            modelBuilder.Entity<Account>(entity => 
            {
                entity.ToTable("Accounts");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.AccountName).HasColumnName("AccountName");
                entity.Property(e => e.AccountType).HasColumnName("AccountType");
                entity.Property(e => e.Balance).HasColumnName("Balance");
                entity.Property(e => e.Description).HasColumnName("Description");
            });


            modelBuilder.Entity<ExpenseCategory>(entity => 
            {
                entity.ToTable("ExpenseCategories");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.CategoryName).HasColumnName("CategoryName");
                entity.Property(e => e.MonthlyBudget).HasColumnName("MonthlyBudget");
                entity.Property(e => e.Description).HasColumnName("Description");
            });


            modelBuilder.Entity<Expense>(entity => 
            {
                entity.ToTable("Expenses");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.Date).HasColumnName("Date");
                entity.Property(e => e.CategoryId).HasColumnName("CategoryId");
                entity.Property(e => e.AccountId).HasColumnName("AccountId");
                entity.Property(e => e.Amount).HasColumnName("Amount");
                entity.Property(e => e.Description).HasColumnName("Description");
                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
                entity.Property(e => e.ModifiedDate).HasColumnName("ModifiedDate");
            });

            
            modelBuilder.Entity<User>(entity => 
            {
                entity.ToTable("Users");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.UserName).HasColumnName("UserName");
                entity.Property(e => e.Password).HasColumnName("Password");
                entity.Property(e => e.EmployeeId).HasColumnName("EmployeeId");
                entity.Property(e => e.CreatedDate).HasColumnName("CreatedDate");
                entity.Property(e => e.ModifiedDate).HasColumnName("ModifiedDate");
            });


            modelBuilder.Entity<RoleAccess>(entity => 
            {
                entity.ToTable("RoleAccesses");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.RoleId).HasColumnName("RoleId");
                entity.Property(e => e.IsAllowDashboard).HasColumnName("IsAllowDashboard");
                entity.Property(e => e.IsAllowMasterData).HasColumnName("IsAllowMasterData");
                entity.Property(e => e.IsAllowEmployee).HasColumnName("IsAllowEmployee");
                entity.Property(e => e.IsAllowProduct).HasColumnName("IsAllowProduct");
                entity.Property(e => e.IsAllowCustomer).HasColumnName("IsAllowCustomer");
                entity.Property(e => e.IsAllowSupplier).HasColumnName("IsAllowSupplier");
                entity.Property(e => e.IsAllowPointOfSale).HasColumnName("IsAllowPointOfSale");
                entity.Property(e => e.IsAllowPurchaseInvoice).HasColumnName("IsAllowPurchaseInvoice");
                entity.Property(e => e.IsAllowSalesInvoice).HasColumnName("IsAllowSalesInvoice");
                entity.Property(e => e.IsAllowExpense).HasColumnName("IsAllowExpense");
                entity.Property(e => e.IsAllowReport).HasColumnName("IsAllowReport");
                entity.Property(e => e.IsAllowUser).HasColumnName("IsAllowUser");
          
            });

            
            modelBuilder.Entity<RecordCounter>(entity => 
            {
                entity.ToTable("RecordCounters");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.Month).HasColumnName("Month");
                entity.Property(e =>e.Year).HasColumnName("Year");
                entity.Property(e => e.PointOfSaleLastCounter).HasColumnName("PointOfSaleLastCounter");
                entity.Property(e => e.SalesInvoiceLastCounter).HasColumnName("SalesInvoiceLastCounter");
                entity.Property(e => e.PurchaseInvoiceLastCounter).HasColumnName("PurchaseInvoiceLastCounter");
            });


          

      
        }

    }
}