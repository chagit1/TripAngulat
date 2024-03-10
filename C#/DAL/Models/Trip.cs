using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Trip
{
    public short TripId { get; set; }

    public string? Target { get; set; }

    public short? TypeId { get; set; }
    public DateTime? DateTrip { get; set; }

    public TimeSpan? LeavingTime { get; set; }

    public short? Duration { get; set; }

    public int? SeatsAvailable { get; set; }
    public int? Price { get; set; }

    public string? Image { get; set; }


    public virtual TypesOfTrip? Type { get; set; }
    public virtual ICollection<Models.Booking> Bookings { get; set; } = new List<Models.Booking>();

}
