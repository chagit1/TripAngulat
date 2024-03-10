using BLL.Interface;
using DAL.Interface;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrganizedTrips.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
      readonly  IUserBLL users;
        private ILogger<string> logger;

        public UsersController(IUserBLL user, ILogger<string> logger)
        {
            this.users = user;
            this.logger = logger;
        }
        [HttpGet("GetAllUsersAaync")]
        public async Task<List<User>> GetAllUsersAaync()
        {
            return await users.GetAllBLLAaync();
        }
        [HttpGet("GetAllTripsPerUser/{id}")]
        public async Task<List<Trip>> GetAllTripsPerUser(short id)
        {
            return await users.GetAllTripsBLLAaync(id);
        }

        [HttpGet("GetByPassAngEmailAaync/{email}/{pass}")]
        public async Task<User> GetByPassAngEmailAaync(string email, string pass)
        {
            return await users.GetByPassAngEmailAaync(email, pass);
        }

        [HttpPost("AddUser")]
        public async Task<User> AddUser(User user)
        {
            return await users.AddBLLAaync(user);
        }
        [HttpDelete("DeleteUser/{id}")]
        public async Task<bool> DeleteUserAsync(short id)
        {
            return await users.DeleteBLLAsync(id);
        }

        [HttpPut("UpdateUser")]
        public async Task<User> UpdateUser(User user)
        {
            return await users.UpdateBLLAaync(user);
        }
    }
}
