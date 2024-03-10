// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { endWith } from 'rxjs';
import { Trips } from 'src/app/class/Trip';
import { TypeOfTrip } from 'src/app/class/TypeOfTrip';
import { TypeSer } from 'src/app/service/TypeSer.service';

@Component({
  selector: 'app-all-type-of-trip',
  templateUrl: './all-type-of-trip.component.html',
  styleUrls: ['./all-type-of-trip.component.css']
})

export class AllTypeOfTripComponent implements OnInit {

  constructor(public servType: TypeSer, public r: Router) { }

  ListType: Array<TypeOfTrip> = new Array<TypeOfTrip>()
  newListType: Array<TypeOfTrip> = new Array<TypeOfTrip>()
  ListTrip: Array<Trips> = new Array<Trips>()

  ngOnInit(): void {
    this.servType.getAllType().subscribe(
      succ => {
        this.ListType = succ;
     
        console.log(this.ListType)
      },
      data => { this.ListType = data })
    // this.ser.().subscribe(
    //       succ => { this.ListTrip = succ; console.log(this.ListTrip) },
    //       data => { this.ListTrip = data })
    //   }
  }



  // GetTripByIdType(idTypes: number | undefined) {
  //   debugger
  //   this.servType.getTripByIdTypeBLLAsync(idTypes!).subscribe(
  //     succ => { this.ListTrip = succ;    },
  //     data => { this.ListTrip = data })
  //     this.ListType = this.newListType;

  // }
  // ListTrip: Array<Trips> = new Array<Trips>()

  // GetDetails(id: number | undefined) {
  //   debugger
  //   this.r.navigate(['/DetailsTripId', id]);
  // }


  // GetTripByIdTypeAsync(id: number) {
  //   debugger
  //   this.servType.getTripByIdTypeBLLAsync(id).subscribe(
  //     // s=>{console.log(s)},
  //     data => {this.ListTrip = data }
  //   )
  //   console.log(this.ListTrip)
  // }
  tripsByType(id: number | undefined) {
    debugger
    this.r.navigate(['/allTripByIdType', id]);
  }
}







