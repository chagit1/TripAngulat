using DAL.Interface;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.function
{
    public class TripDal : ITrip
    {
        private readonly IContext context;
        private readonly ILogger<string> logger;
        public TripDal(ILogger<string> logger, IContext context)
        {
            this.context = context;
            this.logger = logger;
        }

        public async Task<List<Models.Trip>> GetAllAsync()
        {
            return await context.Trips
                .Include(p => p.Type)
                .Include(e => e.Bookings)
               .ToListAsync();
        }
        public async Task<Models.Trip> GetByIdAsync(short tripId)
        {
            try
            {
                var trip = await context.Trips
                     .Include(p => p.Type)
                     .Include(e => e.Bookings)
                   .FirstOrDefaultAsync(p => p.TripId == tripId);
                if (trip == null)
                {
                    logger.LogError("Don't have this trip");
                    return new Trip();
                }
                return trip;
            }
            catch (Exception ex)
            {
                logger.LogError("failed");
                return new Trip();
            }
        }
        //    foreach (var item in db.Trips)
        //    {
        //        if (item.TripId == tripId)
        //        {
        //            return item;
        //        }

        //    }
        //    return null;
        //}
        public async Task<short> AddAsync(Models.Trip trip)
        {
            try
            {

                var newTrip = await context.Trips.AddAsync(trip);
                await context.SaveChangesAsync();

                return 1;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message.ToString());
                return -1;
            }
        }
        public async Task<bool> DeleteAsync(short tripId)
        {
            try
            {
                var trip = await GetByIdAsync(tripId);
                if (trip != null)
                {
                    var s = context.Trips.Remove(trip);
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message.ToString());
                return false;
            }
        }

        public async Task<bool> UpdateAsync(Models.Trip trip)
        {
            try
            {
                var t = await GetByIdAsync(trip.TripId);
                if (t == null)
                {
                    logger.LogError("the code is not exit");
                    return false;
                }
                t.TypeId = trip.TypeId;
                t.Target = trip.Target;
                t.Duration = trip.Duration;
                t.DateTrip = trip.DateTrip;
                t.Image = trip.Image;
                t.LeavingTime = trip.LeavingTime;
                t.SeatsAvailable = trip.SeatsAvailable;
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message.ToString());
                return false;
            }
        }

    }
}
