import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trips } from 'src/app/class/Trip';
import { TripSer } from 'src/app/service/TripSer.service';
import { BookingComponent } from '../booking/booking.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService} from 'primeng/api';


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  constructor(
    public servTrip: TripSer,
    public ar:ActivatedRoute,
    public dialogService: DialogService,
    public messageService: MessageService
    ) { }
  idTrip:number = 0
  trips:Trips = new Trips()
  bookingConfirmed: boolean = false;


    ngOnInit(): void {
      this.ar.params.subscribe(t=>this.idTrip = t['id'])
      const tripId= this.idTrip

      this.servTrip.getByIdTrips(tripId).subscribe(
       succ => { this.trips = succ; console.log(this.trips) },
       data => { this.trips = data })
      }
      //this.trip.seatsAvailable פונקציה זו שולחת לקומפוננטת הבן נתון 
      //dialogServiceדרך  data אני מכניסה אותו לתוך הפרמטר 
      //DynamicDialogConfig ובקומפוננטת הבן הוא נשלף 
      invent(){
        const ref: DynamicDialogRef = this.dialogService.open(BookingComponent, {
          data: { trip: this.trips },
          // header: 'Booking',
          // width: '50%',
        });
    
        ref.onClose.subscribe((result) => {
          if (result && result.bookingConfirmed) {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          }
        
        //   //   alert('Booking has been made.');
        //   // } else {
        //   //   alert('Booking canceled or not enough places available.');
        //   // }
        });
      

        // this.r.navigate([`./DetailsTripId/${this.idTrip}/booking/${num}`]);
      }
      // onBookingConfirmed() {
      //   console.log('Booking confirmed');
      //   this.bookingConfirmed = true;
      // }
    }






    //  this.ar.params.subscribe(t=>this.idTrip = t['id'])
    
      //  const tripId= this.idTrip
        // Number(this.ar.snapshot.paramMap.get('idTrip'))
        // snapshot.paramMap.get('tripId'))

      // this.servTripByType.getByIdTrips(tripId).subscribe(
      //   succ => { console.log(succ);
      //     this.trip = succ }
            // error => {
        // console.error("שגיאה בקריאה לשרת:", error);  // הדפס את השגיאה לקונסול
      // }
        // data => { this.trip = data })

        // console.log(this.trip)
      // )
    
      // const tripId= Number(this.ar.snapshot.paramMap.get('tripId'))
      // console.log(tripId);
    
      // this.AllUser
    
    //  this.servTrip.getByIdTrips(tripId).subscribe(
    //   (succ=>{
    //     console.log(succ);
    //     this.trip=succ
    //   })
    //  )
    // }
    // GetDetails(id:number|undefined){

    //   // const tripId= Number(this.r.snapshot.paramMap.get('tripId'))
    //   debugger
    //   this.r.navigate(['/DetailsTripId', id]);
    // }

