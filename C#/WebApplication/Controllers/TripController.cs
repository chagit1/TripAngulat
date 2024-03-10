using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
    
        ITripBLL tripBLL;
        public TripController(ITripBLL service)
        {
            tripBLL = service;
        }
        
        [HttpGet]
        public List<Trip> GetAll()
        {           
              return tripBLL.GetAll();            
        }
       // [HttpGet]
       //public List<Booking> GetInvitesToTrip(Trip trip)
       // {
       //     return tripBLL.GetInvitesToTrip(trip);
       // }
       // [HttpGet]
       // public Trip GetById(short tripId)
       // {
       //     return tripBLL.GetById(tripId);
       // }
       // [HttpPost]
       // public short Add(Trip trip)
       // {
       //     return tripBLL.Add(trip);
       // }
       // [HttpPost]
       //public bool Update(Trip trip)
       // {
       //     return tripBLL.Update(trip);
       // }

    }
}
