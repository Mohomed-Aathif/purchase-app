using Microsoft.AspNetCore.Mvc;
using PurchaseOrder.Models;

[ApiController]
[Route("api/[controller]")]
public class LocationController : ControllerBase
{
    private readonly AppDbContext _context;

    public LocationController(AppDbContext context)
    {
        _context = context;
    }

    // SAVE locations from login
    [HttpPost("save")]
    public async Task<IActionResult> SaveLocations([FromBody] List<LocationDetail> locations)
    {
        if (locations == null || locations.Count == 0)
            return BadRequest("No data");

        await _context.Location_Details.AddRangeAsync(locations);
        await _context.SaveChangesAsync();

        return Ok("Saved");
    }

    // GET for dropdown
    [HttpGet("all")]
    public IActionResult GetLocations()
    {
        var data = _context.Location_Details.ToList();
        return Ok(data);
    }
}