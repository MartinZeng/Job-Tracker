namespace JobTrackerApi.Models;

public class Application
{
    public int Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Status { get; set; } = "Applied";
    public string? DateApplied { get; set; }
    public string? Salary { get; set; }
    public string? Location { get; set; }
    public string? Link { get; set; }
    public string? Notes { get; set; }
    public long CreatedAt { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
}