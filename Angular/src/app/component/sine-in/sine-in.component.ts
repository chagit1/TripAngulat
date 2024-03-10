import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/User';
import { UserSer } from 'src/app/service/UserSer.service';

@Component({
  selector: 'app-sine-in',
  templateUrl: './sine-in.component.html',
  styleUrls: ['./sine-in.component.css']
})
export class SineInComponent {
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
  users: User = new User;
  //פונקציה שליחה למסד
  send() {  
     debugger
 this.users = this.f.value
    this.serU.add(this.users).subscribe(
      // succ => { 
      //   debugger
      //   this.serU.currentUser = succ; 
      //   console.log(this.serU.currentUser);
      //   this.r.navigate(['/allType']);
      // },
      // err => {
      //   alert("אופס נסה שנית")
      //   console.log(err);
      //   this.r.navigate(['/sinein']);
      // });
    //   if (succ!=0) {
    //     this.serU.currentUser = succ; 
    //     console.log(this.serU.currentUser);
    //     this.r.navigate(['/allType']);
    //   } else {
    //     alert("אנא הזן ערכים מתאימים")
    //     this.r.navigate(['/sinein']);
    //   }
    // },
    // err => {
    //   alert("אופס נסה שנית")
    //   console.log(err);
    //   this.r.navigate(['/sinein']);
    // )}

    succ => { 
      const a =0
      debugger
      if (succ.firstName!=null) {
        this.serU.currentUser = succ; 
        console.log(this.serU.currentUser);
        this.r.navigate(['/allType']);
      } else {
        alert("הסיסמא או האמייל אינם תקינים")
        this.r.navigate(['/sinein']);
      }
    },
    err => {
      alert("אופס נסה שנית")
      console.log(err);
      this.r.navigate(['/sinein']);
    });
  
    const theCurrentUser = JSON.stringify(this.serU.currentUser)
    localStorage.setItem('TheCurrentUser', theCurrentUser)

      // succ => {
      //   this.serU.currentUser = succ; 
      //   // console.log(this.serU.currentUser);
      //   this.r.navigate([`/allType`])
      // },
      // err=>{alert("aaa")}
      // )

      // this.sc.getAllCategory().subscribe(
      //   // הפרמטר הראשון לעולם יהיה הצלחה
      //   //והוא מכיל את הערך שהוחזר
      //   succ=>{this.ListC=succ;console.log(this.ListC)},
      //   //הפרמטר השני כשלון - ואינו חובה
      //   // הפרמטר מכיל אובייקט שגיאה
        
      // )
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
}
