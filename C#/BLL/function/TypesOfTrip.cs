
using AutoMapper;
using BLL.Interface;
using DAL.Interface;
using DAL.Models;
using DTO;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypesOfTrip = DTO.TypesOfTrip;

namespace BLL.function
{
    public class TypesOfTripBLL: ITypesOfTripBLL
    {

        private readonly ITypesOfTrip dal;
        private readonly ITrip trip;
        private readonly IMapper mapper;
        private readonly ILogger<string> logger;

        public TypesOfTripBLL(ITypesOfTrip dal, ILogger<string> logger, IMapper mapper, ITrip trip)
        {
            this.dal = dal;
            this.mapper = mapper;
            this.logger = logger;
            this.trip = trip;
        }

        //DALהמסד שנמצא ב dal.GetAll()פונקציה ממירה את הנתונים שהתקבלו ב
        //BLLוממיר את הרשימה שהתקבלה הממסד ל
        public async Task<List<TypesOfTrip>> GetAllAaync()
        {
            try
            {
                var type = await dal.GetAllDLLAsync();
                return mapper.Map<List<TypesOfTrip>>(type);
            }
            catch (Exception ex)
            {
                logger.LogError("faild" + ex.Message);
                throw ex;
            }
        }
        public async Task<List<DTO.Trip>> GetTripByIdTypeBLLAsync(short id)
        {
            try
            {
                var type = await dal.GetTripByIdTypeDLLAsync(id);
                return mapper.Map<List<DTO.Trip>>(type);
            }
            catch (Exception ex)
            {
                logger.LogError("faild" + ex.Message);
                throw ex;
            }
        }

        public async Task<short> AddAaync(DTO.TypesOfTrip type)
        {

            try
            {
                var types = await dal.GetAllDLLAsync();
                if (types.Count(e => e.TypeName == type.TypeName) > 0)
                    return -1;
                var t = mapper.Map<DAL.Models.TypesOfTrip>(type);
                var newType = await dal.AddDLLAsync(t);
                return type.TypeId;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message);
                throw ex;
            }                    
        }

        public async Task<bool> DeleteAaync(short typeId)
        {
            try
            {
                return await dal.DeleteDLLAsync(typeId);

            }
            catch (Exception ex)
            {
                logger.LogError("faild to delete product in the service" + ex.Message);
                throw ex;
            }
        }
    }
}
