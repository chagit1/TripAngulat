using DAL.Interface;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.function
{
    public class TypesOfTripDal : ITypesOfTrip
    {
        //הזרקת המסד למשתנה 
        private readonly IContext context;
        private readonly ILogger<string> logger;

        public TypesOfTripDal(ILogger<string> logger, IContext context)
        {
            this.context = context;
            this.logger = logger;
        }
        //פונקציה המחזירה את כל סוגי בטיולים 
        public async Task<List<TypesOfTrip>> GetAllDLLAsync()
        {
                   //.Include(p => p.Type)
            return await context.TypesOfTrips
                //.Include(p => p.Trips)                
                .ToListAsync();
        }
        //פונקציה המחזירה סוג טיול לפי ID
        public async Task<TypesOfTrip> GetByIdDLLAsync(short typesOfTrip)
        {          
            try
            {
                var type = await context.TypesOfTrips.FirstOrDefaultAsync(e => e.TypeId == typesOfTrip);
                if (type == null)
                {
                    logger.LogError("Don't have this booking");
                    return new TypesOfTrip();
                }
                return type;
            }
            catch (Exception ex)
            {
                logger.LogError("failed");
                return new TypesOfTrip();
            }
        }

        public async Task< List<Trip>> GetTripByIdTypeDLLAsync(short typesOfTrip)
        {
            try
            {
                List<Trip> trips = new List<Trip>();
                var t = await context.Trips.ToListAsync();
                foreach (var item in t.Where(e => e.TypeId == typesOfTrip))
                {
                    trips.Add(item);
                }
                //var type = context.Trips.Where(e => e.TypeId == typesOfTrip);
                if (trips == null)
                {
                    logger.LogError("Don't have this trip");
                }
                return trips;
            }
            catch (Exception ex)
            {
                logger.LogError("failed");
                return new List<Trip>();
            }
        }
        //פונקציית הוספה 
        public async Task<short> AddDLLAsync(Models.TypesOfTrip typesOfTrip)
        {
            try
            {
                var newType = await this.context.TypesOfTrips.AddAsync(typesOfTrip);
                await context.SaveChangesAsync();
                return newType.Entity.TypeId;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message.ToString());
                return -1;
            }
        }
        //פונקציית מחיקה 
        public async Task<bool> DeleteDLLAsync(short typesOfTripId)
        {
            try
            {
                var type = await GetByIdDLLAsync(typesOfTripId);
                if (type != null)
                {
                    context.TypesOfTrips.Remove(type);
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                logger.LogError("failed" + ex.Message.ToString());
                return false;
            }
        }
    }
}
