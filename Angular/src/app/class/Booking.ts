import { Time } from "@angular/common";

export class Booking{
    constructor(       
        public  bookingId?:number,
        public  userName?: string,
        public  tripTarget?: string,
        public  tripDate?: Date,
        public  userId?: number,
        public  dateBooking?: Date,
        public  bookingTime?:Time, 
        public  tripId?: number,
        public  severalPlaces?:number)
          {
          }
  }
  



