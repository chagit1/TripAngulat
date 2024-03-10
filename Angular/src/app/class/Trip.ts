import { Time } from "@angular/common";

export class Trips{
    slice(arg0: number, arg1: number): Trips {
      throw new Error('Method not implemented.');
    }
    constructor(
     
        public  tripId?: number,
        public  needMedic?: boolean,
        public  target?: string,
        public  typeId?: number,
        public  typeName?: number,  
        public  dateTrip?: Date, 
        public  leavingTime?: Time,
        public  duration?: number,
        public  seatsAvailable?:number,
        public  image?: string,
        public  price?: number,

        )
        {}
  }
  

