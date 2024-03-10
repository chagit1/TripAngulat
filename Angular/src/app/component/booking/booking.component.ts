import { Component, Inject, OnInit, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Booking } from 'src/app/class/Booking';
import { Trips } from 'src/app/class/Trip';
import { BookinSer } from 'src/app/service/BookingSer.service';
import { TripSer } from 'src/app/service/TripSer.service';
import { UserSer } from 'src/app/service/UserSer.service';
import { MessageService} from 'primeng/api';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  numOfPlaces: number = 1;
  trip: Trips = new Trips()

  // constructor(public dialogRef: MatDialogRef<BookingComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: { availablePlaces: number }
  // ) {
  //   this.availablePlaces = data.availablePlaces;
  // }
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public serUser: UserSer,
    public serTrip: TripSer,
    public serBooking:BookinSer,
    public r: Router ,
    public messageService: MessageService

  ) {
    this.trip = config.data.trip;
  }

  booking: Booking = new Booking()


  ngOnInit(): void {
    debugger
    // this.ar.params.subscribe(t => this.availablePlaces = t['num'])
    // console.log(this.availablePlaces)
  }
  reject(){
    this.ref.close({ bookingConfirmed: true });
  }
  confirmBooking() {
    debugger
    if (this.serUser.currentUser.userId == null){
      this.ref.close({ bookingConfirmed: true });
      this.r.navigate(['/login'])
    }
    else
    if (this.numOfPlaces && this.numOfPlaces > 0) {
      // Check if there are enough places
      if (this.numOfPlaces <= this.trip.seatsAvailable!) {
        this.booking.severalPlaces = this.numOfPlaces

        this.booking.userId = this.serUser.currentUser.userId
        this.booking.userName = `${this.serUser.currentUser.firstName} ${this.serUser.currentUser.lastName}`
        console.log(this.booking.userName);
    
        this.booking.tripId = this.trip.tripId
        this.booking.tripTarget = this.trip.target

        this.serBooking.add(this.booking).subscribe(
succ => { 
      
      debugger
      if (succ.tripTarget!=null) {
        this.serBooking.currentBooking = succ; 
        console.log(this.serBooking.currentBooking);
              //הדפסת הצלחה בצורה של הרמת כוסית 
              // this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Message Content' });

        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        alert('Booking has been made.');
        this.ref.close({ bookingConfirmed: true });
        // this.r.navigate(['/allType']);
      }
    },
    err => {
      //הדפסת השגיאה בצורה של הרמת כוסית 
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Oops, something went wrong, please try again', life: 3000 });
      // alert("אופס נסה שנית")
      console.log(err);
      // this.r.navigate(['/sinein']);
    });


       
      // }
      // else {
      //   alert('Not enough places available.');
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        this.messageService.add({ severity: 'error', summary: 'not performed', detail: 'Not enough places available', life: 3000 });

        // alert('Not enough places available.');
        // this.r.navigate(['/sinein']);
      }
    }
  }
}
