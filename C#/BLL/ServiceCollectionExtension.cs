using AutoMapper;
using BLL.function;
using BLL.Interface;
using DAL;
using DAL.Interface;
using DAL.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL;
using DTO;

namespace BLL
{
    public static class ServiceCollectionExtension
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddRepositories();

            services.AddScoped<IBookingBLL, BookingBLL>();
            services.AddScoped<ITripBLL, TripBLL>();
            services.AddScoped<ITypesOfTripBLL, TypesOfTripBLL>();
            services.AddScoped<IUserBLL, UserBLL>();

            services.AddSingleton<IContext,DAL.Models.OrganizedTripsProjectContext>();
            services.AddAutoMapper(typeof(TripProfile));
        }
    }
}
