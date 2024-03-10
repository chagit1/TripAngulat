import { HttpClient } from "@angular/common/http"
import { Trips } from "../class/Trip"
import { Observable } from "rxjs"
import { Injectable } from "@angular/core"

@Injectable
({
    providedIn: 'root'
})

export class TripSer {
    showBooking:boolean = false
    trip:Array<Trips>=new Array();
  image:string = '../../../assets/picture/'

    constructor(public http: HttpClient) { 
       
    }
    basisUrl:string = "https://localhost:7203/api/Trips"
    AllTrip: Array<Trips> = new Array()

    getAllTrip():Observable<Array<Trips>>{
        return this.http.get<Array<Trips>>(`${this.basisUrl}`)
    }
    getByIdTrips(id: number):Observable<Trips>{
        debugger
        return this.http.get<Trips>(`${this.basisUrl}/GetByIdTripsAaync/${id}`)
    }
    getInvitesToTripAaync(id:number):Observable<Array<Trips>>{
        return this.http.get<Array<Trips>>(`${this.basisUrl}/GetInvitesToTripAaync/${id}`)
    }
}