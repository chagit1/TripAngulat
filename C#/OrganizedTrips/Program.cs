
using BLL;
using BLL.function;
using BLL.Interface;
using DAL.function;
using DAL.Interface;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddServises;
builder.Services.AddServices();
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddDbContext<OrganizedTripsProjectContext>(options => options.UseSqlServer("Server=.;Database=OrganizedTripsProject;TrustServerCertificate=True;Trusted_Connection=True;"));

//builder.Services.AddAutoMapper(typeof(Program));

//builder.Services.AddScoped(typeof(IBooking), typeof(BookingDal));
//builder.Services.AddScoped(typeof(IBookingBLL), typeof(BookingBLL));

//builder.Services.AddScoped(typeof(ITrip), typeof(TripDal));
//builder.Services.AddScoped(typeof(ITripBLL), typeof(TripBLL));

//builder.Services.AddScoped(typeof(ITypesOfTrip), typeof(TypesOfTripDal));
//builder.Services.AddScoped(typeof(ITypesOfTripBLL), typeof(TypesOfTripBLL));

//builder.Services.AddScoped(typeof(IUser), typeof(UserDal));
//builder.Services.AddScoped(typeof(IUserBLL), typeof(UserBLL));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});
builder.Services.AddCors(option => option.AddPolicy("AllowAll",
    builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    }
    ));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseCors(builder =>
//{
//    builder
//    .AllowAnyOrigin()
//    .AllowAnyHeader()
//    .AllowAnyMethod();
    
//});

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
