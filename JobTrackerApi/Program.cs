using Microsoft.EntityFrameworkCore;
using JobTrackerApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(
            "http://localhost:5173",
            "https://job-tracker-peach-one.vercel.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();

app.UseCors();
app.MapControllers();
app.Run();