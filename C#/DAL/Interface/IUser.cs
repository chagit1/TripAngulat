using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public interface IUser
    {
       Task<List<User>> GetAllDLLAsync();
       Task<User> GetByPassAsync(string email, string pass);
       Task<short> AddDLLAsync(Models.User user);
       Task<bool> DeleteDLLAsync(short userId);
       Task<User> GetByIdAsync(short userId);
       Task<bool> UpdateDLLAsync(User user);
    }
}
