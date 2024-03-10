﻿using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class User
{
    public short UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string? Email { get; set; }

    public string LoginPassword { get; set; } = null!;

    public bool? FirstAiderCtificate { get; set; }

    public virtual ICollection<Models.Booking> Bookings { get; set; } = new List<Models.Booking>();
}
