import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/User';
import { UserSer } from 'src/app/service/UserSer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public useSer:UserSer ,public r : Router){}
  ngOnInit(): void {
    this.f = new FormGroup({
      'email': new FormControl(null, this.checkEmail.bind(this)),
      'loginPassword': new FormControl(null, this.check.bind(this))
    });
  }
  

  f: FormGroup = new FormGroup({});
  users: User= new User()
  //פונקצייה שליחה למסד

  toRegister(){
    this.r.navigate(['/sinein']);
  }

  send() {
    debugger
    const manager = localStorage.getItem('Manager')
    const Manager = JSON.parse(manager!)
    

    this.users = this.f.value
    //בודק אם הוא ששוה למנהל 
    if(this.users.email == Manager.email && this.users.loginPassword == Manager.loginPassword){
      this.useSer.theManager=Manager
      // this.useSer.currentUser = new User(); 
      const use = JSON.stringify(new User)
      localStorage.setItem('TheCurrentUser',use)
      const theCurrentUser = JSON.stringify(Manager)
      localStorage.setItem('Manager', theCurrentUser)
      console.log(this.useSer.currentUser);
      
      this.r.navigate(['/allType']);
    }

    else{
    this.useSer.getByPassAngEmail(this.users.email!,this.users.loginPassword!).subscribe(
    succ => { 
      debugger
      if (succ.firstName!=null) {
        this.useSer.currentUser = succ; 
        console.log(this.useSer.currentUser);

        const theCurrentUser = JSON.stringify(this.useSer.currentUser)
        localStorage.setItem('TheCurrentUser', theCurrentUser)
        this.r.navigate(['/allType']);
      } else {
        alert("משתמש זה אינו קיים במערכת ")
        this.r.navigate(['/sinein']);
      }
    },
    err => {
      alert("אופס נסה שנית")
      console.log(err);
      this.r.navigate(['/sinein']);
    });
  }
  

  }
  //get פונקציות 
  get getEmail() {
    return this.f.controls['email']
  }
  get getPass() {
    return this.f.controls['loginPassword']
  }
  //פונקצייה הבודקת תקינות המייל 
  checkEmail(fc: AbstractControl) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!fc.value)
      return { required: true }
    if (!regex.test(fc.value))
      return { invalid: true }
    return null
  }
//פונקצייה הבודקת תקינות הסיסמא
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



