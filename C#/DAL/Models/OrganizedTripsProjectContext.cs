using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

public partial class OrganizedTripsProjectContext : DbContext, IContext
{
    public OrganizedTripsProjectContext()
    {
    }

    public OrganizedTripsProjectContext(DbContextOptions<OrganizedTripsProjectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<Trip> Trips { get; set; }

    public virtual DbSet<TypesOfTrip> TypesOfTrips { get; set; }

    public virtual DbSet<User> Users { get; set; }

    

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-L9S4R74;Initial Catalog=OrganizedTripsProject; Trusted_Connection=True;MultipleActiveResultSets=True;Encrypt=False");
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__Booking__73951AED6268BD1E");

            entity.ToTable("Booking");

            entity.Property(e => e.DateBooking).HasColumnType("date");

            entity.HasOne(d => d.Trip).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.TripId)
                .HasConstraintName("FK__Booking__TripId__3F466844");

            entity.HasOne(d => d.User).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Booking__UserId__3E52440B");
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.HasKey(e => e.TripId).HasName("PK__Trips__51DC713EDFD69319");

            entity.Property(e => e.DateTrip).HasColumnType("date");
            entity.Property(e => e.Image)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Target)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Type).WithMany(p => p.Trips)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK__Trips__TypeId__3B75D760");
        });

        modelBuilder.Entity<TypesOfTrip>(entity =>
        {
            entity.HasKey(e => e.TypeId).HasName("PK__TypesOfT__516F03B5717F8FE1");

            entity.Property(e => e.TypeName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C86F8AF64");

            entity.Property(e => e.Email)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LoginPassword)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
