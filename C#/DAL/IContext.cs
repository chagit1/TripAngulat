using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace DAL
{
    public interface IContext
    {
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TypesOfTrip> TypesOfTrips { get; set; }
        public DbSet<User> Users { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));

    }
}
