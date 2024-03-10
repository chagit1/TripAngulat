using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public interface ITrip
    {
       Task<List<Trip>> GetAllAsync();
       Task<Trip> GetByIdAsync(short tripId);
       Task<short> AddAsync(Trip trip);
       Task<bool> DeleteAsync(short tripId);
       Task<bool> UpdateAsync(Trip trip);
    }
}
