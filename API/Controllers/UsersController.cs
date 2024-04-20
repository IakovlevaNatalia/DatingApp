using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
public class UsersController : BaseApiController
{
    private readonly DataContext context;

    public UsersController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task <ActionResult<IEnumerable<AppUser>>> GetUsers()  
    {
        var users = await context.Users.ToListAsync();
        return users;
    }

    [HttpGet("{id}")] 

    public async Task <ActionResult<AppUser>> GetUser(int id) 
    {
        return await context.Users.FindAsync(id);
    }
}
