using DAL.function;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public interface ITypesOfTrip
    {
       Task<List<TypesOfTrip>> GetAllDLLAsync();
       Task<List<Trip>> GetTripByIdTypeDLLAsync(short id);
       Task<TypesOfTrip> GetByIdDLLAsync(short typesOfTripId);
       Task<short> AddDLLAsync(TypesOfTrip typesOfTrip);
       Task<bool> DeleteDLLAsync(short typesOfTripId);
    }
}
