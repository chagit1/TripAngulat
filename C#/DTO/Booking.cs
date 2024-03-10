using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Booking
    {
        public short BookingId { get; set; }

        public short? UserId { get; set; }

        public DateTime? DateBooking { get; set; }

        public TimeSpan? BookingTime { get; set; }

        public short? TripId { get; set; }

        public int? SeveralPlaces { get; set; }
        public string UserName { get; set; }

        public string TripTarget { get; set; }
        public DateTime TripDate { get; set; }

       
    }
}
