import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trips } from 'src/app/class/Trip';
import { TypeOfTrip } from 'src/app/class/TypeOfTrip';
import { TripSer } from 'src/app/service/TripSer.service';
import { TypeSer } from 'src/app/service/TypeSer.service';
// import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-trip-by-id-type',
  templateUrl: './trip-by-id-type.component.html',
  styleUrls: ['./trip-by-id-type.component.css']
})
export class TripByIdTypeComponent implements OnInit {

  constructor(
    public servTripByType: TypeSer, 
    public ar: ActivatedRoute,
     public r: Router,
     public serTript:TripSer
    ) { }
  idType: number = 0
  ngOnInit(): void {
    this.ar.params.subscribe(t => this.idType = t['id'])
    debugger
    this.servTripByType.getTripByIdTypeBLLAsync(this.idType).subscribe(
      succ => { this.ListTrip = succ; console.log(this.ListTrip) },
      data => { this.ListTrip = data })
  }
  ListTrip: Array<Trips> = new Array<Trips>()
  GetDetails(id: number | undefined) {
    debugger
    this.r.navigate(['/DetailsTripId', id]);
  }
}