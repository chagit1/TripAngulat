using BLL.Interface;
using DAL.Models;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TypesOfTrip = DTO.TypesOfTrip;

namespace OrganizedTrips.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeOfTripController : ControllerBase
    {       
            readonly ITypesOfTripBLL type;
            private ILogger<string> logger;

            public TypeOfTripController(ITypesOfTripBLL types, ILogger<string> logger)
            {
                this.type = types;
                this.logger = logger;
            }

            [HttpGet("GetAllTypeAaync")]
            public async Task<List<TypesOfTrip>> GetAllTypeAaync()
            {
                return await type.GetAllAaync();
            }
        [HttpGet("GetTripByIdTypeBLLAsync/{id}")]
        public async Task<List<DTO.Trip>> GetTripByIdTypeAsync(short id)
        {
            return await type.GetTripByIdTypeBLLAsync(id);
        }

    }
}
