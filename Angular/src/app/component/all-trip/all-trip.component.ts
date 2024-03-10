import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trips } from 'src/app/class/Trip';
import { TypeOfTrip } from 'src/app/class/TypeOfTrip';
import { TripSer } from 'src/app/service/TripSer.service';
import { TypeSer } from 'src/app/service/TypeSer.service';

@Component({
  selector: 'app-all-trip',
  templateUrl: './all-trip.component.html',
  styleUrls: ['./all-trip.component.css']
})
export class AllTripComponent implements OnInit {
  constructor(
    public servTrip: TripSer, 
    public serType: TypeSer, 
    public r: Router) { }

  ListTrip: Array<Trips> = this.servTrip.trip;
  ListType: Array<TypeOfTrip> = new Array<TypeOfTrip>();
  ListFilter: Array<TypeOfTrip> = new Array<TypeOfTrip>();
  // rout:string = '../../../assets/picture/'
  // rout:string = this.servTrip.image + 
  ngOnInit(): void {
    debugger
    this.servTrip.getAllTrip().subscribe(
      succ => {
        this.ListTrip = succ.filter(trip => new Date(trip.dateTrip!) > new Date());
        this.servTrip.trip = this.ListTrip;
        console.log(this.ListTrip);
      },
      data => {
        this.ListTrip = data;
      }
    );

    this.serType.getAllType().subscribe(
      succ => {
        // Filter the objects based on date
        this.ListType = succ;
        console.log(this.ListTrip);
      },
      data => {
        this.ListTrip = data;
      }
    );
  }

  filterTypes = [
    { label: 'שם', value: 'name',id:1 },
    { label: 'סוג', value: 'type',id:2 },
    { label: 'תאריך', value: 'date',id:3 },
  ];

  filter(id:number)
  {
    //  this.ListFilter=this.ListTrip.filter(a=>a.==id)
  }
  date(){
    // this.ListFilter=this.ListFilter.sort((a,b)=>)

  }
  getImagePath(servTripImage: string, typeId: number, fImage: string): string {
    return `${servTripImage}/${typeId}/${fImage}`;
  }
  
 



  tripsByType(id: number | undefined) {
    debugger
    this.r.navigate(['/DetailsTripId', id]);
  }
}


