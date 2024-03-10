
using AutoMapper;
using BLL.Interface;
using DAL.Interface;
using DTO;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.function
{
    public class BookingBLL : IBookingBLL
    {

        private readonly IBooking dal;
        private readonly IMapper mapper;
        private readonly ITrip trip;
        private readonly ILogger<string> logger;

        public BookingBLL(IBooking dal, ITrip trip, ILogger<string> logger, IMapper mapper)
        {
            this.dal = dal;
            this.mapper = mapper;
            this.logger = logger;
            this.trip = trip;
        }
        //DALהמסד שנמצא ב dal.GetAll()פונקציה ממירה את הנתונים שהתקבלו ב
        //BLLוממיר את הרשימה שהתקבלה הממסד ל
        public async Task<List<Booking>> GetAllBLLAaync()
        {
            try
            {
                var booking = await dal.GetAllDALAsync();
                return mapper.Map<List<Booking>>(booking);
            }
            catch (Exception ex)
            {
                logger.LogError("faild" + ex.Message);
                throw ex;
            }
        }

        //public async Task<List<Booking>> GetAllToTripAaync(short tripId)
        //{



        //    return mapper.Map<List<DAL.Models.Booking>, List<Booking>>(await dal.GetAllAsync().where(e => e.TripId == tripId).ToLis());
        //}
        public bool Check(Booking booking)
        {
            if (booking.TripDate < DateTime.Now.Date)
                return false;
            if (booking.SeveralPlaces <= 0)
                return false;
            return true;
        }



        public async Task<Booking> AddBLLAaync(Booking booking)
        {
            try
            {
                List<Booking> list = mapper.Map<List<Booking>>(await dal.GetAllDALAsync());
                if (list.Count(e => e.BookingId == booking.BookingId) < 0)
                    return new Booking();
                if (Check(booking))
                    return new Booking();
                booking.DateBooking = DateTime.Now;
                booking.BookingTime = DateTime.Now.TimeOfDay;

                var newBooking = mapper.Map<DAL.Models.Booking>(booking);
                await dal.AddDALAsync(newBooking);

                var idTrip = await trip.GetByIdAsync((short)newBooking.TripId);
                idTrip.SeatsAvailable -= newBooking.SeveralPlaces;
                await trip.UpdateAsync(idTrip);
                return booking;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;
            }

        }
        public async Task<bool> DeleteBLLAaync(short bookingId)
        {
            try
            {
                var book = await dal.GetByIdDALAsync(bookingId);
                var idTrip = await trip.GetByIdAsync((short)book.TripId);
                if (idTrip.DateTrip >= DateTime.Now)
                {
                    idTrip.SeatsAvailable += book.SeveralPlaces;
                    await trip.UpdateAsync(idTrip);
                    await dal.DeleteDALAsync(book.BookingId);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;
            }
        }



    }
}
