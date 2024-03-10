import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { TypeOfTrip } from "../class/TypeOfTrip"
import { Trips } from "../class/Trip"

@Injectable({
    providedIn: 'root'
})

export class TypeSer {
    constructor(public http: HttpClient) { }
    basisUrl:string = "https://localhost:7203/api/TypeOfTrip/"

    getAllType():Observable<Array<TypeOfTrip>>{
        return this.http.get<Array<TypeOfTrip>>(`${this.basisUrl}GetAllTypeAaync`)
    }
    
    getTripByIdTypeBLLAsync(id:number):Observable<Array<Trips>>{
        return this.http.get<Array<Trips>>(`${this.basisUrl}GetTripByIdTypeBLLAsync/${id}`)
    }
}
