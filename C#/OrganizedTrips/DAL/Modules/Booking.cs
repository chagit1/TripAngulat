using System;
using System.Collections.Generic;

namespace OrganizedTrips.DAL.Modules;

public partial class Booking
{
    public short BookingId { get; set; }

    public short? UserId { get; set; }

    public DateTime? DateBooking { get; set; }

    public TimeSpan? BookingTime { get; set; }

    public short? TripId { get; set; }

    public int? SeveralPlaces { get; set; }

    public virtual Trip? Trip { get; set; }

    public virtual User? User { get; set; }
}
