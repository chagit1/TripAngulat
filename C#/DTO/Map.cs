
using AutoMapper;
using DAL.function;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace DTO
{
    public class TripProfile : Profile
    {
        public TripProfile()
        {

            CreateMap<DAL.Models.TypesOfTrip, TypesOfTrip>().ReverseMap();

            CreateMap<DAL.Models.User, User>();
            CreateMap<User, DAL.Models.User>();
                //.ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<Trip, DAL.Models.Trip>().ForMember(dest => dest.TripId, opt => opt.Ignore());
            // עם המשתנים שם סוג והאם צריך חובש Trip ממיר את מחלקת 
            CreateMap<DAL.Models.Trip, Trip>()
               .ForMember(dest => dest.TypeName, opt => opt.MapFrom(src => src.Type.TypeName))
               .ForMember(dest => dest.NeedMedic, opt => opt.MapFrom(src => src.Bookings.Count(e => e.User.FirstAiderCtificate == true)>0));
             
            CreateMap<Booking, DAL.Models.Booking>()
                .ForMember(dest => dest.DateBooking, opt => opt.Ignore())
                .ForMember(dest => dest.BookingTime, opt => opt.Ignore())
                .ForMember(dest => dest.BookingId, opt => opt.Ignore());

            CreateMap<DAL.Models.Booking, Booking>()
                      .ForMember(dest => dest.UserName,
                opt => opt.MapFrom(src => src.User.FirstName + " " + src.User.LastName))
                       .ForMember(dest => dest.TripTarget,
                opt => opt.MapFrom(src => src.Trip.Target));
        }
    }
}
