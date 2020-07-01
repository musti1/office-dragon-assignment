using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using dotnet_api.Models;
using System.Net.Http;

namespace dotnet_api.Controllers
{
    [ApiController]
    [Route("api/company/add")]
    [EnableCors("AllowOrigin")]
    public class CompanyController : ControllerBase
    {
        private readonly MyWebApiContext _context;

        private readonly ILogger<CompanyController> _logger;

        public CompanyController(ILogger<CompanyController> logger, MyWebApiContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(Guid companyId)
        {
            var company = await _context.Companies.FindAsync(companyId);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        [HttpPost]
        public async Task<ActionResult<Boolean>> PostCompany(Company[] companies)
        {
            foreach (Company company in companies)
            {
                company.companyId = new Guid();
                _context.Companies.Add(company);
                await _context.SaveChangesAsync();
            }
        
            return true;
        }
    }
}
