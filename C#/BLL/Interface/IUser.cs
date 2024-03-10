using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace BLL.Interface
{
    public interface IUserBLL
    {
        Task<List<User>> GetAllBLLAaync();
        Task<List<Trip>> GetAllTripsBLLAaync(short user);
        Task<User> GetByPassAngEmailAaync(string email, string pass);
        Task<User> AddBLLAaync(User user);
        Task<bool> DeleteBLLAsync(short userId);
        Task<User> UpdateBLLAaync(User user);
    }
}
