using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using dotnet_api.Models;

namespace dotnet_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.Configure<CorsOptions>(options =>
            {
                options.AddPolicy(
                    "AllowAnySimpleRequest",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .WithMethods("GET", "POST", "HEAD");
                    });

                options.AddPolicy(
                    "AllowSpecificOrigin",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000");
                    });

                options.AddPolicy(
                    "WithCredentials",
                    builder =>
                    {
                        builder.AllowCredentials()
                               .WithOrigins("http://localhost:3000");
                    });

                options.AddPolicy(
                    "WithCredentialsAndOtherSettings",
                    builder =>
                    {
                        builder.AllowCredentials()
                               .WithOrigins("http://localhost:3000")
                               .AllowAnyHeader()
                               .WithMethods("PUT", "POST")
                               .WithExposedHeaders("exposed1", "exposed2");
                    });

                options.AddPolicy(
                    "AllowAll",
                    builder =>
                    {
                        builder.AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowAnyOrigin();
                    });

                options.AddPolicy(
                    "Allow example.com",
                    builder =>
                    {
                        builder.AllowCredentials()
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .WithOrigins("http://localhost:3000");
                    });
            });
            services.AddEntityFrameworkNpgsql().AddDbContext<MyWebApiContext>(opt => 
            opt.UseNpgsql(Configuration.GetConnectionString("MyWebApiConnection")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            
            app.UseCors();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
