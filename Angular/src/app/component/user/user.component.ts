import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from 'src/app/class/User';
import { UserSer } from 'src/app/service/UserSer.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  [x: string]: any;



  //  z:any =localStorage.getItem('TheCurrentUser');
  //  user : any=JSON.parse(this.z!);
  user: User = new User()
  constructor(
    public serU: UserSer,
    public r: Router,
    // private confirmationService: ConfirmationService
    ) {
    this.user = this.serU.currentUser

  }

  // confirm() {
  //   this.confirmationService.confirm({
  //     icon: 'pi pi-exclamation-triangle',

  //   });
  // }

  ngOnInit(): void {
    console.log(this.serU.currentUser);

  }

  show() {
    debugger
    this.r.navigate(['/user/TripPerUser'])
  }
  edit() {
    debugger

    this.r.navigate(['/editUser'])
  }
  allUser(){
    debugger
    this.r.navigate(['/user/allUser'])
  }
}
//   constructor(private messageService: MessageService) {}
//   items: MenuItem[] | undefined;

//   ngOnInit() {
//       this.items = [
//           {
//               label: 'Options',
//               items: [
//                   {
//                       label: 'Update',
//                       icon: 'pi pi-refresh',
//                       command: () => {
//                           this.update();
//                       }
//                   },
//                   {
//                       label: 'Delete',
//                       icon: 'pi pi-times',
//                       command: () => {
//                           this.delete();
//                       }
//                   }
//               ]
//           },
//           {
//               label: 'Navigate',
//               items: [
//                   {
//                       label: 'Angular',
//                       icon: 'pi pi-external-link',
//                       url: 'http://angular.io'
//                   },
//                   {
//                       label: 'Router',
//                       icon: 'pi pi-upload',
//                       routerLink: '/fileupload'
//                   }
//               ]
//           }
//       ];
//   }

//   update() {
//       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
//   }

//   delete() {
//       this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
//   }

// }
