
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
    public class TripBLL : ITripBLL
    {
        private readonly ITrip dal;
        private readonly IMapper mapper;
        private readonly ILogger<string> logger;
        private readonly IBooking booking;
        private readonly IUser user;


        public TripBLL(ITrip dal, ILogger<string> logger, IMapper mapper, IBooking booking, IUser user)
        {
            this.dal = dal;
            this.mapper = mapper;
            this.logger = logger;
            this.booking = booking;
            this.user = user;
        }

        //DALהמסד שנמצא ב dal.GetAll()פונקציה ממירה את הנתונים שהתקבלו ב
        //BLLוממיר את הרשימה שהתקבלה הממסד ל
        public async Task<List<Trip>> GetAllAaync()
        {
            try
            {
                var trips = await dal.GetAllAsync();
                return mapper.Map<List<Trip>>(trips);
            }
            catch (Exception ex)
            {
                logger.LogError("faild" + ex.Message);
                throw ex;
            }
        }
        public async Task<Trip> GetByIdAaync(short id)
        {
            try
            {
                var user = await dal.GetByIdAsync(id);
                return mapper.Map<Trip>(user);
            }

            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;

            }
        }

        public bool Check(Trip trip)
        {
            if (trip.DateTrip < DateTime.Now)
                return false;
            if (trip.Duration < 1 && trip.Duration > 30)
                return false;
            if (trip.SeatsAvailable <= 0)
                return false;
            return true;
        }
        public async Task<short> AddAaync(Trip trip)
        {
            try
            {
                if (!Check(trip))
                    return -1;
                var newUser = mapper.Map<DAL.Models.Trip>(trip);
               
                    var use = await dal.AddAsync(newUser);
                
                    return trip.TripId;               
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;
            }

        }
        public async Task<bool> UpdateAaync(Trip trip)
        {
            try
            {
                if (!Check(trip))
                    return false;
                if (trip.DateTrip < DateTime.Now)
                {
                    return false;
                }
                var tr = mapper.Map<DAL.Models.Trip>(trip);
                var updTrip = await dal.UpdateAsync(tr);
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;
            }
        }
        public async Task<List<Booking>> GetInvitesToTripAaync(short tripId)
        {
            try
            {
                var b = await booking.GetAllDALAsync();
                List<Booking> bookings = mapper.Map<List<Booking>>(b);
                List<Booking> bookin = new List<Booking>();

                foreach (Booking obj in bookings)
                {
                    if (obj.TripId == tripId)
                        bookin.Add(obj);
                }
                return bookin;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;
            }
        }
        public async Task<bool> NeedMedic(Trip trip)
        {
            try
            {
                List<Booking> bookings = mapper.Map<List<Booking>>(await booking.GetAllDALAsync());
                foreach (var item in bookings)
                {
                    var users = await user.GetByIdAsync((short)item.UserId);
                    var u = mapper.Map<User>(users);
                    if (u.FirstAiderCtificate == true)
                    {
                        trip.NeedMedic = true;
                        var t = mapper.Map<DAL.Models.Trip>(trip);
                        await dal.UpdateAsync(t);
                        break;
                    }
                }
                var tr = mapper.Map<Trip>(trip);
                return tr.NeedMedic;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;
            }
        }
        public async Task DeleteBLLAsync(short tripId)
        {
            try
            {
                var a = await dal.GetByIdAsync(tripId);
                var b = mapper.Map<Trip>(a);
                var c = await dal.DeleteAsync(tripId);
                return;
            }
            catch (Exception ex)
            {
                logger.LogError("faild to delete product in the service" + ex.Message);
                throw ex;
            }
        }
    }
}
