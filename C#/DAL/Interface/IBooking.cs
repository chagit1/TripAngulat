using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public interface IBooking
    {
        Task<List<Booking>> GetAllDALAsync();
        Task<Booking> GetByIdDALAsync(short bookingId);
        Task<short> AddDALAsync(Booking booking);
        Task<bool> DeleteDALAsync(short bookingId);



    }
}
