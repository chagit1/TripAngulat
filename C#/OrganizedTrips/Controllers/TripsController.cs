using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrganizedTrips.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        readonly ITripBLL trip;
        private ILogger<string> logger;

        public TripsController(ITripBLL trip, ILogger<string> logger)
        {
            this.trip = trip;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<List<Trip>> GetAllTripsAsync()
        {
            return await trip.GetAllAaync();
        }
        [HttpGet("GetByIdTripsAaync/{id}")]
        public async Task<Trip> GetByIdTripsAaync(short id)
        {
            return await trip.GetByIdAaync(id);
        }
        [HttpGet("GetInvitesToTripAaync/{id}")]
        public async Task<List<Booking>> GetInvitesToTripAaync(short trips) => await trip.GetInvitesToTripAaync(trips);

        [HttpPost("AddAaync")]
        public async Task<short> AddAaync(Trip trips)
        {
            return await trip.AddAaync(trips);
        }

        [HttpPut("UpdateAaync")]
        public async Task<bool> UpdateAaync(Trip trips)
        {
            return await trip.UpdateAaync(trips);
        }
        [HttpDelete("DeleteBLLAsync/{id}")]
        public async Task DeleteBLLAsync(short trips)
        {
             await trip.DeleteBLLAsync(trips);
        }
        
        //[HttpGet]
        //public List<Booking> GetInvitesToTrip(Trip trip)
        //{
        //    return tripBLL.GetInvitesToTrip(trip);
        //}
        //[HttpGet]
        //public Trip GetByIdTrip(short tripId)
        //{
        //    return tripBLL.GetById(tripId);
        //}
        //[HttpPost]
        //public short AddTrip(Trip trip)
        //{
        //    return tripBLL.Add(trip);
        //}
        //[HttpPost]
        //public bool UpdateTrip(Trip trip)
        //{
        //    return tripBLL.Update(trip);
        //}
    }
}
