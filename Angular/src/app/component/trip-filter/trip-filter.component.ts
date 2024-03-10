import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trips } from 'src/app/class/Trip';
import { TripSer } from 'src/app/service/TripSer.service';
import { UserSer } from 'src/app/service/UserSer.service';

@Component({
  selector: 'app-trip-filter',
  templateUrl: './trip-filter.component.html',
  styleUrls: ['./trip-filter.component.css']
})
export class TripFilterComponent implements OnInit {
  constructor(
    public servTrip: TripSer, 
    public serUse: UserSer,
    public ar: ActivatedRoute) { }

  ngOnInit(): void {

  }
  

}
