using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Trip
    {
        public short TripId { get; set; }
        public string? Target { get; set; }
        public short? TypeId { get; set; }
        public string? TypeName { get; set; } = null;
        public DateTime? DateTrip { get; set; }
        public TimeSpan? LeavingTime { get; set; }
        public short? Duration { get; set; }
        public int? SeatsAvailable { get; set; }
        public int? Price { get; set; }
        public string? Image { get; set; }
        public bool NeedMedic { get; set; } 
    }
}
