using System;
using System.Collections.Generic;

namespace OrganizedTrips.DAL.Modules;

public partial class Trip
{
    public short TripId { get; set; }

    public string? Target { get; set; }

    public short? TypeId { get; set; }

    public DateTime? DateTrip { get; set; }

    public TimeSpan? LeavingTime { get; set; }

    public short? Duration { get; set; }

    public int? SeatsAvailable { get; set; }

    public string? Image { get; set; }

    public int? Price { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual TypesOfTrip? Type { get; set; }
}
