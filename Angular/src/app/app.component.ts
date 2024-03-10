import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UserSer } from './service/UserSer.service';
import { User } from './class/User';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // user: any=localStorage.getItem('TheCurrentUser')
  // z:any =localStorage.getItem('TheCurrentUser');
  // user : User=JSON.parse(this.z!);  
  constructor(private primengConfig: PrimeNGConfig, public serU: UserSer,
  ) {
    // this.user = serU.currentUser
   }
  user:User=new User;
  
  ngOnInit() {
    this.user = this.serU.currentUser
  //  const v =localStorage.getItem('TheCurrentUser');
  //   this.user=JSON.parse(v!);
    // user : User=JSON.parse(this.z!); 
    console.log("vjifv");
    
    console.log(this.user)
    const manager = JSON.stringify(
      {
        firstName: "Manager",
        phone: "0548559840",
        email: "chagit@gmail.con",
        loginPassword: "Ch@32623"
      }
    )
    localStorage.setItem('Manager', manager)

    // const theCurrentUser = JSON.stringify(
    //   {
    //     "userId": 0,
    //     "firstName": "",
    //     "lastName": "",
    //     "phone": "",
    //     "email": "",
    //     "loginPassword": "",
    //     "firstAiderCtificate": false
    //   }
    // )
    // localStorage.setItem('TheCurrentUser')
 
    // const use = localStorage.getItem('TheCurrentUser')

    // this.user =  JSON.parse(use!)
    this.fillMenu();

    this.primengConfig.ripple = true;

    this.user = this.serU.currentUser

    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };


    //   this.primengConfig.filterMatchModeOptions = {
    //     text: [ FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    //     numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    //     date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    // };
    this.primengConfig
      .setTranslation({
        accept: 'Accept',
        reject: 'Cancel',
        //translations
      });

  }
  tabItems!: MenuItem[];
  fillMenu() {
    this.tabItems = [
      {
        label: 'HomeSheet',
        //command: () => this.router.navigate(['home']),
        routerLink: 'HomeSheet',
      },
      {
        label: 'sinein',
        //command: () => this.router.navigate(['tab-1']),
        routerLink: 'sinein',
      },
      {
        label: 'login',
        //command: () => this.router.navigate(['tab-2']),
        routerLink: 'login',
      },
    ];
  }


  //     path: '',
  //     redirectTo: 'HomeSheet',
  //     pathMatch: 'full',
  //   },

  //   {
  //     path: 'HomeSheet',
  //     pathMatch: 'full',
  //     component: HomeComponent,
  //   },

  //   {
  //     path: 'login',
  //     pathMatch: 'full',
  //     component: LoginComponent,
  //   },

  //   {
  //     path: 'sinein',
  //     pathMatch: 'full',
  //     component: SineInComponent,
  //   },




  title = 'angularProject';
}
