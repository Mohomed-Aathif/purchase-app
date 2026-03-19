using Microsoft.EntityFrameworkCore;
using PurchaseOrder.Models;
using PurchaseOrder.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<LocationDetail> Location_Details { get; set; }
}