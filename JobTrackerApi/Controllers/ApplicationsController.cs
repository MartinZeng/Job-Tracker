using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using JobTrackerApi.Data;
using JobTrackerApi.Models;
using System.Security.Claims;

namespace JobTrackerApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]

public class ApplicationsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ApplicationsController(AppDbContext db) => _db = db;

    [HttpGet("me")]
    public IActionResult GetMe()
    {
        var claims = User.Claims.Select(c => new { c.Type, c.Value });
        return Ok(claims);
    }   

    private string GetUserId() {
        var nameId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var sub = User.FindFirstValue("sub");
        return nameId ?? sub ?? throw new UnauthorizedAccessException("No user ID found");
    }

    [HttpGet]
public async Task<IActionResult> GetAll()
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new UnauthorizedAccessException("No user ID found");

    return Ok(await _db.Applications
        .Where(a => a.UserId == userId)
        .OrderByDescending(a => a.CreatedAt)
        .ToListAsync());
}

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var userId = GetUserId();
        var app = await _db.Applications
            .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);
        return app is null ? NotFound() : Ok(app);
    }

    [HttpGet("debug/userid")]
    public IActionResult GetUserId2()
    {
        try
        {
            var id = GetUserId();
            return Ok(new { userId = id });
        }
        catch (Exception e)
        {
            return Ok(new { error = e.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(Application app)
    {
        app.UserId = GetUserId();
        app.CreatedAt = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        _db.Applications.Add(app);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = app.Id }, app);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Application updated)
    {
        var userId = GetUserId();
        var app = await _db.Applications
            .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);
        if (app is null) return NotFound();

        app.Company     = updated.Company;
        app.Role        = updated.Role;
        app.Status      = updated.Status;
        app.DateApplied = updated.DateApplied;
        app.Salary      = updated.Salary;
        app.Location    = updated.Location;
        app.Link        = updated.Link;
        app.Notes       = updated.Notes;

        await _db.SaveChangesAsync();
        return Ok(app);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = GetUserId();
        var app = await _db.Applications
            .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);
        if (app is null) return NotFound();
        _db.Applications.Remove(app);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}