using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace BLL.Interface
{
    public interface ITripBLL
    {
       Task<List<Trip>> GetAllAaync();
       Task<List<Booking>> GetInvitesToTripAaync(short trip);
       Task<Trip> GetByIdAaync(short tripId);
       Task<short> AddAaync(Trip trip);
       Task<bool> UpdateAaync(Trip trip);
       Task DeleteBLLAsync(short trip);
    }
}
