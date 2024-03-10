using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
using DTO;
using TypesOfTrip = DTO.TypesOfTrip;

namespace BLL.Interface
{
    public interface ITypesOfTripBLL
    {
       Task<List<TypesOfTrip>> GetAllAaync();
       Task<List<DTO.Trip>> GetTripByIdTypeBLLAsync(short id);
       Task<short> AddAaync(TypesOfTrip typesOfTrip);
       Task<bool> DeleteAaync(short typesOfTripId);
    }
}
