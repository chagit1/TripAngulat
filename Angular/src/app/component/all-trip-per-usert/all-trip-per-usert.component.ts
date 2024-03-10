import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/class/Booking';
import { Trips } from 'src/app/class/Trip';
import { BookinSer } from 'src/app/service/BookingSer.service';
import { TripSer } from 'src/app/service/TripSer.service';
import { UserSer } from 'src/app/service/UserSer.service';

@Component({
  selector: 'app-all-trip-per-usert',
  templateUrl: './all-trip-per-usert.component.html',
  styleUrls: ['./all-trip-per-usert.component.css']
})
export class AllTripPerUsertComponent {
  ListTrip: Array<Trips> = new Array<Trips>()
  ListBooking: Array<Booking> = new Array<Booking>()
  idUser?: number = 0
  idTrip: number = 0
  a: Array<Booking> = new Array<Booking>()
  trip: Trips = new Trips()
  constructor(
    public useSer: UserSer,
    public serTrip:TripSer,
    public bookingSer: BookinSer,
    public r: Router,
    public ar: ActivatedRoute) {
    this.idUser = this.useSer.currentUser.userId
  }


  ngOnInit() {
    this.useSer.getAllTripsPerUser(this.idUser!).subscribe(
      succ => { 
        this.ListTrip = succ;
        this.useSer.ListFilter=succ
        this.useSer.ListTrip = this.ListTrip;
         console.log(this.useSer.ListTrip) 
        },
      error => { console.error('שגיאה בהצגת טיולי המשתמש:', error); }
    );
  }
 
  remove(id:number |undefined) {
    debugger
    this.bookingSer.getAllBookings().subscribe(
      succ => {
        this.ListBooking = succ.filter(book => book.tripId == id && book.userId == this.useSer.currentUser.userId);
        console.log(this.ListBooking);
        this.bookingSer.delete(this.ListBooking[0].bookingId!).subscribe(
          success => {
            if (success == true) {
              console.log('משתמש נמחק בהצלחה:', success);
             this.ngOnInit()
            }
            else
              alert("rong")
          },
          error => {
            console.error('שגיאה במחיקת משתמש:', error);
          }
        );
      },
      error => { console.error('שגיאה במחיקת משתמש:', error); }
    );
    console.log(this.ListBooking);
    
  }


}
