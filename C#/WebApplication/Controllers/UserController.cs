//using DAL.Interface;
//using DTO;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace WebApplication.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//         IUser users;
//        public UserController(IUser user) {
//            this.users = user;
//        }
//        [HttpGet]
//        public List<User> GetAll()
//        {
//            return users.GetAll();
//        }
//        [HttpGet]
//        public List<Trip> GetAllTrips(User user)
//        {
//            return users.
//        }
//        public User GetByPassAngEmail(User user);
//        public short Add(User user);
//        public bool Delete(short userId);
//        public bool Update(User user);

//    }
//}
