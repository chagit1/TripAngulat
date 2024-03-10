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
    public class BookingDal : IBooking
    {
        private readonly IContext context;
        private  ILogger<string> logger;

        public BookingDal(ILogger<string> logger, IContext context)
        {
            this.context = context;
            this.logger = logger;
        }

        public async Task<List<Booking>> GetAllDALAsync()
        {
            return await context.Bookings
                .Include(p => p.User)
                .Include(p => p.Trip)
                .ToListAsync();
        }

        public async Task<Booking> GetByIdDALAsync(short bookingId)
        {
            try
            {
                var booking = await context.Bookings
                    .Include(p => p.User)
                    .Include (p => p.Trip)
                    .FirstOrDefaultAsync(e => e.BookingId == bookingId);
                if (booking == null)
                {
                    logger.LogError("Don't have this booking");
                    return new Booking();
                }
                return booking;
            }
            catch (Exception ex)
            {
                logger.LogError("failed");
                return new Booking();
            }
        }
        public async Task<short> AddDALAsync(Booking booking)
        {
            try
            {
                var newBooking = await this.context.Bookings.AddAsync(booking);
                await context.SaveChangesAsync();
                return newBooking.Entity.BookingId;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message.ToString());
                return -1;
            }
        }
        public async Task<bool> DeleteDALAsync(short bookingId)
        {
            try
            {
                var booking = await GetByIdDALAsync(bookingId);
                if (booking != null)
                {
                    context.Bookings.Remove(booking);
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
    }

}
