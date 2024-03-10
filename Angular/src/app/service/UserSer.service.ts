import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../class/User';
import { Trips } from '../class/Trip';

@Injectable({
    providedIn: 'root'
})

export class UserSer implements OnInit {
allUser!:User[];
    
    ListFilter:Array<Trips>=new Array();
    ListTrip:Array<Trips>=new Array();
    currentUser!: User
    theManager:User = new User()
    constructor(public http: HttpClient) {
        const storedObject = JSON.parse(localStorage.getItem('TheCurrentUser')!);
        this.currentUser= storedObject;
        const storedObject1 = JSON.parse(localStorage.getItem('Manager')!);
        this.theManager= storedObject1;
        this.getAllUser().subscribe(
            succ=>{this.allUser = succ; console.log(this.allUser)},
            err=> {console.log(err)})
     }
    ngOnInit(): void {
//         const storedObject = JSON.parse(localStorage.getItem('TheCurrentUser')!);
// this.currentUser= storedObject;
        // const v =localStorage.getItem('TheCurrentUser');
        // this.currentUser=JSON.parse(v!);
        console.log(this.currentUser);
        
    }
    basisUrl: string = "https://localhost:7203/api/Users/"

  

    getAllUser(): Observable<Array<User>> {
        return this.http.get<Array<User>>(`${this.basisUrl}GetAllUsersAaync`)
    }
    getAllTripsPerUser(id:number): Observable<Array<Trips>> {
        return this.http.get<Array<Trips>>(`${this.basisUrl}GetAllTripsPerUser/${id}`)
    }

    getByPassAngEmail(email: string, pass: string): Observable<User> {
        debugger
        return this.http.get<User>(`${this.basisUrl}GetByPassAngEmailAaync/${email}/${pass}`)
    }

    add(u: User) {
        debugger
        //body משתנה הנשלח ב
        return this.http.post<User>(`${this.basisUrl}AddUser`, u)
    }

    update(u: User) {
        debugger
        //body משתנה הנשלח ב
        return this.http.put(`${this.basisUrl}UpdateUser`, u)
    }
    delate(id: number):Observable<any>{
        debugger
        //body משתנה הנשלח ב
        return this.http.delete(`${this.basisUrl}DeleteUser/${id}`)
    }
}


// https://localhost:7203/api/Users/GetByPassAngEmailAaync/zcs@gmail.com/Vv%55555
// https://localhost:7203/api/Users/GetByPassAngEmailAaync/zcs%40gmail.com/Vv%2555555