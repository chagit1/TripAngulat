
using BLL.Interface;
using DAL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using AutoMapper;
using System.Net.Mail;
using Microsoft.Extensions.Logging;

namespace BLL.function
{
    public class UserBLL : IUserBLL
    {
        private readonly IUser dal;
        private readonly IMapper mapper;
        private readonly ITrip trip;
        private readonly ILogger<string> logger;
        private readonly IBooking booking;


        public UserBLL(IUser dal, ITrip trip, ILogger<string> logger, IMapper mapper, IBooking booking)
        {
            this.dal = dal;
            this.mapper = mapper;
            this.logger = logger;
            this.trip = trip;
            this.booking = booking;
        }

        //DALהמסד שנמצא ב dal.GetAll()פונקציה ממירה את הנתונים שהתקבלו ב
        //BLLוממיר את הרשימה שהתקבלה הממסד ל
        public async Task<List<User>> GetAllBLLAaync()
        {
            try
            {
                List<DAL.Models.User> users = await dal.GetAllDLLAsync();
                List<User> gh = mapper.Map<List<User>>(users);
                return gh;
            }
            catch (Exception ex)
            {
                logger.LogError("faild" + ex.Message);
                throw ex;
            }
        }

        public async Task<User> GetByPassAngEmailAaync(string email, string pass)
        {
            try
            {
                var user = await dal.GetByPassAsync(email, pass);

                return mapper.Map<User>(user);
            }

            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;

            }

        }
        public bool IntegrityCheck(User user)
        {

            if (!user.FirstName.All(char.IsLetter))
                return false;

            if (!user.LastName.All(char.IsLetter))
                return false;

            if (!user.Phone.All(char.IsDigit))
                return false;

            //מנסה לבנות את המייל במחלקה מוכנה של מייקרוסופט במידה וכל המייל תקין ואם מצליח לבנות מחזיר כן - המייל תקין 
            if (!MailAddress.TryCreate(user.Email, out MailAddress mailAddress))
                return false;
            //בדיקת הסיסמא 

            // בדיקה אם הסיסמה אורכה בדיוק שמונה תווים
            if (user.LoginPassword.Length != 8)
                return false;

            // בדיקה אם יש לפחות אות קטנה אחת
            if (!user.LoginPassword.Any(char.IsLower))
                return false;

            // בדיקה אם יש לפחות אות גדולה אחת
            if (!user.LoginPassword.Any(char.IsUpper))
                return false;

            // בדיקה אם יש לפחות מספר אחד
            if (!user.LoginPassword.Any(char.IsDigit))
                return false;

            // בדיקה אם יש לפחות תו שאינו מספר או אות
            if (!user.LoginPassword.Any(c => !char.IsLetterOrDigit(c)))
                return false;

            return true;
        }
        public async Task<User> AddBLLAaync(User user)
        {
            try
            {
                if (IntegrityCheck(user))
                {
                    //return new User();                
                    var newUser = mapper.Map<DAL.Models.User>(user);
                    var use = await dal.AddDLLAsync(newUser);
                    if (use == -1)
                        return new User();
                    return user;
                }
                return new User();

            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;
            }


        }


        public async Task<User> UpdateBLLAaync(User user)
        {
            try
            {
                if (!IntegrityCheck(user))
                    return new User();
                var updUser = mapper.Map<DAL.Models.User>(user);
                var use = await dal.UpdateDLLAsync(updUser);

                return user;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                return new User();
            }
            //List<User> users = mapper.Map<List<DAL.Models.User>, List<User>>(await dal.GetAllDLLAsync());
            //User u = users.Find(obj => obj.UserId == user.UserId);

            //if (u == null)
            //    return false;

            //u.FirstName = user.FirstName;
            //u.LastName = user.LastName;
            //u.Email = user.Email;
            //u.Phone = user.Phone;
            //u.FirstAiderCtificate = user.FirstAiderCtificate;
            //u.LoginPassword = user.LoginPassword;

            //return true;
        }



        public async Task<bool> DeleteBLLAsync(short userId)
        {
            try
            {
                var a = await dal.GetAllDLLAsync();
                if (a.Count(e => e.UserId == userId) > 0)
                {
                    await dal.DeleteDLLAsync(userId);
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                logger.LogError("faild to delete product in the service" + ex.Message);
                throw ex;
            }

            //var a = await booking.GetAllAsync();
            //if (a.Count(e => e.UserId == userId) > 0)
            //{
            //    await dal.DeleteDLLAsync(userId);
            //    return true;
            //}
            //return false;
        }
        public async Task<List<Trip>> GetAllTripsBLLAaync(short userId)
        {
            try
            {
                var a = await booking.GetAllDALAsync();
                List<Booking> bookings = mapper.Map<List<Booking>>(a);
                List<Trip> trips = new List<Trip>();

                foreach (Booking obj in bookings.Where(e => e.UserId == userId))
                {
                    //short s = (short) obj.TripId;
                    var d = await trip.GetByIdAsync((short)obj.TripId);
                    trips.Add(mapper.Map<Trip>(d));
                }
                return trips;
            }
            catch (Exception ex)
            {
                logger.LogError("faild to delete product in the service" + ex.Message);
                throw ex;
            }
        }

    }
}