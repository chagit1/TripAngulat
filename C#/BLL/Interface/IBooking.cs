using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace BLL.Interface
{
    public interface IBookingBLL
    {
        Task<List<Booking>> GetAllBLLAaync();
       //Task<List<Booking>> GetAllToTripAaync(short bookingId);
       //Booking GetById(short bookingId);
       Task<Booking> AddBLLAaync(Booking booking);
       Task<bool> DeleteBLLAaync(short bookingId);



    }
}
