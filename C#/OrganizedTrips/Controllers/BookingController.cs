using BLL.Interface;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OrganizedTrips.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        readonly IBookingBLL booking;
        private ILogger<string> logger;

        public BookingController(IBookingBLL booking, ILogger<string> logger)
        {
            this.booking = booking;
            this.logger = logger;
        }

        [HttpGet("GetAllBooking")]
        public async Task<List<Booking>> GetAllBookingAaync()
        {
            return await booking.GetAllBLLAaync();
        }
      
        [HttpPost("AddBooking")]
        public async Task<Booking> AddBooking(Booking bookings)
        {
            return await booking.AddBLLAaync(bookings);
        }

        [HttpDelete("DeleteBooking/{id}")]
        public async Task<bool> DeleteBookingAsync(short id)
        {
            return await booking.DeleteBLLAaync(id);
        }
    }
}
