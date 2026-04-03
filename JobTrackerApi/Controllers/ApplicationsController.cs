using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobTrackerApi.Data;
using JobTrackerApi.Models;

namespace JobTrackerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ApplicationsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Applications.OrderByDescending(a => a.CreatedAt).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var app = await _db.Applications.FindAsync(id);
        return app is null ? NotFound() : Ok(app);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Application app)
    {
        app.CreatedAt = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        _db.Applications.Add(app);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = app.Id }, app);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Application updated)
    {
        var app = await _db.Applications.FindAsync(id);
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
        var app = await _db.Applications.FindAsync(id);
        if (app is null) return NotFound();
        _db.Applications.Remove(app);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}