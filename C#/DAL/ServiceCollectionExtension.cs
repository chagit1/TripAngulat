using DAL.function;
using DAL.Interface;
using DAL.Models;
using Microsoft.Extensions.DependencyInjection;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public static class ServiceCollectionExtension
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IBooking, BookingDal>();
            services.AddScoped<ITrip, TripDal>();
            services.AddScoped<ITypesOfTrip, TypesOfTripDal>();
            services.AddScoped<IUser, UserDal>();
        }
    }
}
