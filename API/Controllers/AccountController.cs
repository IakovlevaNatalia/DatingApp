using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext context;
        private readonly ITokenService tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            this.context = context;
            this.tokenService=tokenService;
        }

        [HttpPost("register")] //Post: api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.UserName)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key

            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.SingleOrDefaultAsync(x =>
                x.UserName == loginDto.Username);
            
            if (user == null) return Unauthorized("\"Invalid User Name\"");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("\"Invalid Password\"");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

    }
}
