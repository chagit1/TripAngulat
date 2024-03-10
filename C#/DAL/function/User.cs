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
    public class UserDal : IUser
    {

        //הזרקת המסד למשתנה 
        private readonly IContext context;
        private readonly ILogger<string> logger;

        public UserDal(ILogger<string> logger, IContext context)
        {
            this.context = context;
            this.logger = logger;
        }
        //פונקציה המחזירה את כל המשתמשים  

        public async Task<List<Models.User>> GetAllDLLAsync()
        {
            return await context.Users
                .Include(p => p.Bookings)
                .ToListAsync();
        }

        //פונקציה המחזירה משתמש לפי ID
        public async Task<Models.User> GetByPassAsync(string email, string pass)
        {
            try
            {
                var user = await context.Users
                     .Include(p => p.Bookings)
                    .FirstOrDefaultAsync(user => user.Email == email && user.LoginPassword! == pass);
                if (user == null)
                {
                    logger.LogError("Don't have this booking");
                    return new User();
                }
                return user;
            }
            catch (Exception ex)
            {
                logger.LogError("failed");
                return new User();
            }
        }
        //פונקציית הוספה 
        public async Task<short> AddDLLAsync(Models.User user)
        {
            try
            {
                var newUser = await this.context.Users.AddAsync(user);
                await context.SaveChangesAsync();
                return newUser.Entity.UserId;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message.ToString());
                return -1;
            }
        }
        //פונקציית מחיקה 
        public async Task<bool> DeleteDLLAsync(short userId)
        {
            try
            {
                var newUser = await context.Users.FirstOrDefaultAsync(e => e.UserId == userId);

                var user = await GetByPassAsync(newUser.Email, newUser.LoginPassword);
                if (user != null)
                {
                    context.Users.Remove(user);
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

      
        public async Task<bool> UpdateDLLAsync(Models.User user)
        {
            try
            {
                var newUser = await context.Users.FirstOrDefaultAsync(e => e.UserId == user.UserId);
                if (user == null)
                {
                    logger.LogError("the code is not exit");
                    return false;
                }
                newUser.FirstName = user.FirstName;
                newUser.LastName = user.LastName;
                newUser.Email = user.Email;
                newUser.Phone = user.Phone;
                newUser.FirstAiderCtificate = user.FirstAiderCtificate;
                newUser.LoginPassword = user.LoginPassword;
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message.ToString());
                return false;
            }

        }
        public async Task<Models.User> GetByIdAsync(short userId)
        {
            try
            {
                var user = await context.Users
                .Include(p => p.Bookings)
                .FirstOrDefaultAsync(e => e.UserId == userId);
                if (user == null)
                {
                    logger.LogError("Don't have this trip");
                    return new User();
                }
                return user;
            }
            catch (Exception ex)
            {
                logger.LogError("failed");
                return new User();
            }
        }
    }
}
