using Microsoft.EntityFrameworkCore;

namespace dotnet_api.Models
{
    public class MyWebApiContext : DbContext
    {
        public MyWebApiContext(DbContextOptions<MyWebApiContext> options) : base(options) {}

        public DbSet<Company> Companies {get; set; }
    }
}