import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/User';
import { UserSer } from 'src/app/service/UserSer.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
// [x: string]: any;
  constructor(public servUser:UserSer){}
  ngOnInit(): void {
    this.ListUser = this.servUser.allUser
    // this.servUser.getAllUser().subscribe(
    //   succ=>{this.ListUser = succ; console.log(this.ListUser)},
    //   err=> {console.log(err)})
      // data=>{this.ListUser=data})
    // this.AllUser()
  }
  ListUser!:User[];
  ListUser1!:User[];

  // ListUser:Array<User> = new Array()
  AllUser(){
    debugger
    console.log("aa");
  this.servUser.getAllUser().subscribe(
    succ=>{this.ListUser = succ; console.log(this.ListUser)},
    // err=> {console.log(err)
    data=>{this.ListUser=data},
  )
  }
}
