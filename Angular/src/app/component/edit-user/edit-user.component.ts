import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trips } from 'src/app/class/Trip';
import { User } from 'src/app/class/User';
import { UserSer } from 'src/app/service/UserSer.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  constructor(public serU: UserSer, public r: Router) { }
  ngOnInit(): void {
    this.f = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.min(10)]),
      'email': new FormControl(null, this.checkEmail.bind(this)),
      'loginPassword': new FormControl(null, this.check.bind(this)),
      'firstAiderCtificate': new FormControl(null)
    });

    // this.serU.data$.subscribe(data => {
    //   this.users = data;
    // });
  }

  f: FormGroup = new FormGroup({});
  users: User = this.serU.currentUser;
  ListTrip: Array<Trips> = new Array()
  //פונקציה שליחה למסד
  send() {
    console.log(this.users)
    debugger
    this.users = this.f.value
    this.users.userId = this.serU.currentUser.userId
    this.serU.update(this.users).subscribe(
      succ => {

        debugger
        this.serU.currentUser = succ;
        console.log(this.serU.currentUser);
        this.r.navigate(['/allType']);

      },
      err => {
        alert("אופס נסה שנית")
        console.log(err);
        this.r.navigate(['/sinein']);
      });
  }
  //get פונקציות 
  get getFirstName() {
    return this.f.controls['firstName']
  }
  get getLastName() {
    return this.f.controls['lastName']
  }
  get getPhone() {
    return this.f.controls['phone']
  }
  get getEmail() {
    return this.f.controls['email']
  }
  get getPass() {
    return this.f.controls['loginPassword']
  }

  //פונקצייה הבודקת תקינות של מייל 
  checkEmail(fc: AbstractControl) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(fc.value))
      return { invalid: true }
    return null
  }
  //פונקצייה הבודקת תקינות של הסיסמא
  check(fc: AbstractControl) {
    //שדה חובה
    if (!fc.value)
      return { 'required': true }
    // קצר מידי
    if (fc.value.length < 8)
      return { 'minLength': true }
    // ארוך מידי
    if (fc.value.length > 8)
      return { 'maxLength': true }
    return null
  }
  delate() {
    debugger
    const userData = this.f.value;
    userData.userId = this.serU.currentUser.userId;
    this.serU.getAllTripsPerUser(userData.userId).subscribe(
      succ => {
        this.ListTrip = succ.filter(trip => new Date(trip.dateTrip!) > new Date());
        window.location.reload()
      },
      error => {
        console.error('שגיאה במחיקת משתמש:', error);
        // כאן תוכל להטיל הודעת שגיאה או לבצע פעולות נוספות במקרה של כישלון
      }
    );
    if (this.ListTrip.length == 0) {
      this.serU.delate(userData.userId).subscribe(
        success => {
          if (success == true) {
            this.serU.currentUser = new User()
            console.log('משתמש נמחק בהצלחה:', success);
            this.r.navigate(['/allTrip'])
          }
          else
            alert("rong")
          // כאן תוכל לבצע פעולות נוספות לאחר המחיקה
        },
        error => {
          console.error('שגיאה במחיקת משתמש:', error);
          // כאן תוכל להטיל הודעת שגיאה או לבצע פעולות נוספות במקרה של כישלון
        }
      );
    }
    else
    alert(" נרשמת לטיולים והם עדיין לא התקיימו")
    // this.serU.delate(userData.userId).subscribe(
    //   success => {
    //     debugger;
    //     this.serU.currentUser = new User();
    //     console.log(this.serU.currentUser);
    //     this.r.navigate(['/allTrip']);
    //   },
    //   error => {
    //     alert("אופס נסה שנית");
    //     console.error(error);
    //     this.r.navigate(['/sinein']);
    //   }
    //   );

    // console.log(this.users)
    // debugger
    // this.users = this.f.value
    // this.users.userId = this.serU.currentUser.userId
    // this.serU.delate(this.serU.currentUser.userId!).subscribe(


    //   succ => {
    //     debugger
    //     this.serU.currentUser = new User();
    //     console.log(this.serU.currentUser);
    //     this.r.navigate(['/allTrip']);


    //   },
    //   err => {
    //     alert("אופס נסה שנית")
    //     console.log(err);
    //     this.r.navigate(['/sinein']);
    //   });

  }
}



