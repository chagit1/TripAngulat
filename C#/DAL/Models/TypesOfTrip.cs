using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class TypesOfTrip
{
    public short TypeId { get; set; }

    public string TypeName { get; set; } = null!;

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
