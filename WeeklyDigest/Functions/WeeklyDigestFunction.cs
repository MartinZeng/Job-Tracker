using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Net.Http.Json;

namespace WeeklyDigest.Functions;

public class WeeklyDigestFunction
{
    private readonly ILogger<WeeklyDigestFunction> _logger;
    private readonly HttpClient _http;

    public WeeklyDigestFunction(
        ILogger<WeeklyDigestFunction> logger,
        IHttpClientFactory factory)
    {
        _logger = logger;
        _http = factory.CreateClient("api");
    }

    [Function("WeeklyDigest")]
    public async Task Run(
        [TimerTrigger("0 0 8 * * 1")] TimerInfo timer)
    {
        _logger.LogInformation("Weekly digest running at: {time}", DateTime.UtcNow);

        var apps = await _http.GetFromJsonAsync<List<Application>>(
            "/api/applications");

        if (apps is null || apps.Count == 0)
        {
            _logger.LogInformation("No applications found.");
            return;
        }

        var active = apps.Where(a =>
            a.Status == "Applied" || a.Status == "Interview").ToList();

        var lines = new List<string>
        {
            $"Weekly job tracker digest — {DateTime.UtcNow:MMMM dd, yyyy}",
            $"Total applications: {apps.Count}",
            $"Active (Applied + Interview): {active.Count}",
            "",
            "--- Active applications ---",
        };

        foreach (var app in active)
        {
            lines.Add($"• {app.Company} | {app.Role} | {app.Status} | Applied: {app.DateApplied ?? "—"}");
        }

        var digest = string.Join("\n", lines);
        _logger.LogInformation("Digest:\n{digest}", digest);
    }
}

public class Application
{
    public int Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? DateApplied { get; set; }
}