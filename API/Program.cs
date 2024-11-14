using API;
using API.Data;
using API.Entities;
using API.Extensions;
using API.SignalR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace API;
public class Program
{
    public static WebApplication app;
    public static async Task Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddApplicationServices(builder.Configuration);
        builder.Services.AddIdentityServices(builder.Configuration);
        builder.Services.AddEndpointsApiExplorer();


        app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseMiddleware<ExceptionMiddleware>();
        app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
                .WithOrigins("http://localhost:4200", "https://localhost:4200"));

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseDefaultFiles();
        app.UseStaticFiles();


        app.MapControllers();
        app.MapHub<PresenceHub>("hubs/presence");
        app.MapHub<MessageHub>("hubs/message");

        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<DataContext>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
            await context.Database.MigrateAsync();
            await context.Database.ExecuteSqlRawAsync("DELETE FROM [Connections]");
            await Seed.SeedUsers(userManager, roleManager);
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred during migration");
        }

        app.Run();

    }
}
