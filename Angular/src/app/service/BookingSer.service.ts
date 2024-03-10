import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Booking } from "../class/Booking"
import { Injectable } from "@angular/core"

@Injectable
({
    providedIn: 'root'
})

export class BookinSer {
    currentBooking: Booking = new Booking()
    showBooking:boolean = false
    constructor(public http: HttpClient) { }
    basisUrl:string = "https://localhost:7203/api/Booking/"


    // getAllTrip():Observable<Array<>>{
    //     return this.http.get<Array<Trips>>(`${this.basisUrl}`)
    // }
    // getByIdTrips(id: number):Observable<Trips>{
    //     debugger
    //     return this.http.get<Trips>(`${this.basisUrl}/GetByIdTripsAaync/${id}`)
    // }
    // getInvitesToTripAaync(id:number):Observable<Array<Trips>>{
    //     return this.http.get<Array<Trips>>(`${this.basisUrl}/GetInvitesToTripAaync/${id}`)
    // }
    getAllBookings(): Observable<Array<Booking>> {
        debugger
        return this.http.get<Array<Booking>>(`${this.basisUrl}GetAllBooking`)
    }
    add(b: Booking) {
        debugger
        //body משתנה הנשלח ב
        return this.http.post<Booking>(`${this.basisUrl}AddBooking`, b)
    }
    delete(id: number):Observable<any>{
        debugger
        //body משתנה הנשלח ב
        return this.http.delete(`${this.basisUrl}DeleteBooking/${id}`)
    }
}