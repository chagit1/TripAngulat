import { ChangeDetectorRef, Component, EventEmitter, ViewChild } from '@angular/core';
import { TripSer } from 'src/app/service/TripSer.service';
import { Sidebar } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
  import { MenuItem } from 'primeng/api';
import { TypeSer } from 'src/app/service/TypeSer.service';
import { Router } from '@angular/router';
import { Trips } from 'src/app/class/Trip';
import { TypeOfTrip } from 'src/app/class/TypeOfTrip';
import { UserSer } from 'src/app/service/UserSer.service';
@Component({
  selector: 'app-bbbbb',
  templateUrl: './bbbbb.component.html',
  styleUrls: ['./bbbbb.component.css']
})
export class BbbbbComponent {
[x: string]: any;
  constructor(
    public servTrip: TripSer, 
    public serType: TypeSer,
    public serUse: UserSer, 
    public r: Router) {}

  ListTrip: Array<Trips> = new Array<Trips>()
  ListType: Array<TypeOfTrip> = new Array<TypeOfTrip>()
  ListFilter: Array<Trips> = new Array<Trips>()
  items!: MenuItem[];

//פותח וסוגר את החלונית הצדדית 
  sidebarVisible: boolean = false;

ngOnInit(): void {
  debugger
  this.servTrip.getAllTrip().subscribe(
    succ => {
      this.ListTrip = succ;
      this.serUse.ListFilter = succ;
      console.log(this.ListTrip);
    },
  );
//אובייקט המראה את המודל של אפשרויות הסינון והמיון 
  this.items = [
  {                
    label: 'סינון לפי תאריך',
    icon: 'pi pi-fw pi-filter',
    id:'10',
    items: [
      {
          label: 'לא התקיים',
          icon: 'pi pi-fw pi-print',
          id:'2',
          command: () => this.s( 'לא התקיים')
      },
      {
        label: 'התקיים',
        icon: 'pi pi-fw pi-print',
        id:'3',
        command: () => this.s('התקיים')
      },
    ]
  },                                                 
  {
    label: 'מחיר',
    icon: 'pi pi-fw pi-pencil',
    id:'20',
      items: [
        {
            label: 'נמיך ביותר',
            icon: 'pi pi-fw pi-align-left',
            id:'4',
            command: () => this.s('נמיך ביותר')
        },
        {
            label: 'גבוהה ביותר',
            icon: 'pi pi-fw pi-align-right',
            id:'5',
            command: () => this.s('גבוהה ביותר')
        },                   
      ]
    },
    {
      label: 'סוג',
      icon: 'pi pi-fw pi-user',
      id:'6',
        items: [
          {
              label: 'walking tracks',

              icon: 'pi pi-fw pi-align-left',
              id: '60',
              command: () => this.s(' 102')
          },
          {
              label: 'Europe',
              icon: 'pi pi-fw pi-align-right',
              id:'61',
              command: () => this.s('101')
          },   
          {
            label: 'attractions',
            icon: 'pi pi-fw pi-align-right',
            id:'62',
            command: () => this.s('100')
        },                   
        ]
    },            
    {
      label: 'מיון תאריכים',
      icon: 'pi pi-fw pi-calendar',
      id:'30',
      items: [
          {
              label: 'הישן ביותר',
              icon: 'pi pi-fw pi-pencil',
              id:'7' ,
              command: () => this.s('הישן ביותר')                     
          },
          {
              label: 'החדש ביותר',
              icon: 'pi pi-fw pi-calendar-times',
            id:'8',
            command: () => this.s('החדש ביותר')
          }
      ]   
    }
  ] 
}

  s(filter:string){
    this.sidebarVisible = false
    switch (filter) {
      case  'לא התקיים':
        {
          this.ListFilter = this.ListTrip;
          this.serUse.ListFilter = this.getTripNotPassedDate(this.ListFilter)
          // this.sidebarVisible = false
          this.r.navigate(['/tripFilter'])
        }
        break;
        case 'התקיים':
          {       
            this.serUse.ListFilter = this.ListTrip;
            this.serUse.ListFilter = this.getTripPassedDate(this.ListFilter)
            // this.sidebarVisible = false
            this.r.navigate(['/tripFilter'])
          }         
        break;
        case 'נמיך ביותר':
          {   
            this.ListFilter = this.ListTrip;
            this.serUse.ListFilter = this.ListFilter.sort((a, b) => a.price! - b.price!);
            // this.sidebarVisible = false             
            this.r.navigate(['/tripFilter'])
          }
        break;    
        case  'גבוהה ביותר':
          {            
            this.ListFilter = this.ListTrip;
            this.serUse.ListFilter = this.ListFilter.sort((a, b) => b.price! - a.price!);
            // this.sidebarVisible = false
            this.r.navigate(['/tripFilter'])
          }             
        break;
        case 'הישן ביותר':
          {
            this.ListFilter = this.ListTrip;
            this.serUse.ListFilter = this.sortOldestToNewest(this.ListFilter)
            // this.sidebarVisible = false
            this.r.navigate(['/tripFilter'])
          }                 
        break;
        case 'החדש ביותר':
          {
            this.ListFilter = this.ListTrip;
            this.serUse.ListFilter = this.sortNewestToOldest(this.ListFilter)
            // this.sidebarVisible = false
            this.r.navigate(['/tripFilter'])
          }            
        break;
        default:
          {
          //סינון לפי סוג
            const a = parseInt(filter)
            this.ListFilter = this.ListTrip;
            this.serType.getTripByIdTypeBLLAsync(a!).subscribe(
              succ => { this.ListFilter = succ; console.log(this.ListFilter) ;
              this.serUse.ListFilter = succ;
            });
            // this.sidebarVisible = false
            this.r.navigate(['/tripFilter'])
          }
        break;       
      }
    }
//מיון לפי תאריך מהחדש לישן
  sortNewestToOldest = (objects: any[]): any[] =>
    objects
      .filter(obj => !(isNaN(Date.parse(obj.dateTrip))))
      .sort((a, b) => (new Date(b.dateTrip)).getTime() - (new Date(a.dateTrip)).getTime());

//מיון לפי תאריך מהישן לחדש 
  sortOldestToNewest = (objects: any[]): any[] =>
    objects
      .filter(obj => !(isNaN(Date.parse(obj.dateTrip))))
      .sort((a, b) => (new Date(a.dateTrip)).getTime() - (new Date(b.dateTrip)).getTime());

//מחזיר את כל הטיולים שהתקיימו 
  getTripPassedDate(objects: any[]): any[] {
    const currentDate = new Date();
    return objects.filter(obj => new Date(obj.dateTrip) < currentDate);
  }

//מחזיר את כל הטיולים שעדיין לא התקיימו
  getTripNotPassedDate(objects: any[]): any[] {
    const currentDate = new Date();
    return objects.filter(obj => new Date(obj.dateTrip) >= currentDate);
  }
}
 








//       import { ChangeDetectorRef, Component, EventEmitter, ViewChild } from '@angular/core';
// import { TripSer } from 'src/app/service/TripSer.service';
// import { Sidebar } from 'primeng/sidebar';
// import { StyleClassModule } from 'primeng/styleclass';
//   import { MenuItem } from 'primeng/api';
// import { TypeSer } from 'src/app/service/TypeSer.service';
// import { Router } from '@angular/router';
// import { Trips } from 'src/app/class/Trip';
// import { TypeOfTrip } from 'src/app/class/TypeOfTrip';
// @Component({
//   selector: 'app-bbbbb',
//   templateUrl: './bbbbb.component.html',
//   styleUrls: ['./bbbbb.component.css']
// })
// export class BbbbbComponent {
// [x: string]: any;
//   constructor(
//     public servTrip: TripSer, 
//     public serType: TypeSer, 
//     public r: Router) { }

// //פותח וסוגר את החלונית הצדדית 
//   ListTrip: Array<Trips> = new Array<Trips>()
//   ListType: Array<TypeOfTrip> = new Array<TypeOfTrip>()
//   ListFilter: Array<Trips> = new Array<Trips>()
//   items!: MenuItem[];

//   sidebarVisible: boolean = false;
//   private selectedItem = new EventEmitter<any>();

// //   // פונקציה שמתפרטת בלחיצה על כפתור בתפריט
// // handleButtonClick(obj: any) {
// //   debugger
// //   console.log("האובייקט שהתקבל:", obj);
// //   // ניתן להוסיף פעולות נוספות כגון שליחת הנתונים לשרת או עדכון משתנים בקומפוננטה
// // }

// ngOnInit(): void {
//   debugger
//   this.servTrip.getAllTrip().subscribe(
//     succ => {
//       // Filter the objects based on date
//       this.ListTrip = succ;
//       this.ListFilter = succ;
//       console.log(this.ListTrip);
//     },
//   );

//   // this.serType.getAllType().subscribe(
//   //   succ => {
//   //     // Filter the objects based on date
//   //     this.ListType = succ;
//   //     console.log(this.ListTrip);
//   //   },
//   //   data => {
//   //     this.ListTrip = data;
//   //   }
//   // );
    
//         this.items = [
//             {                
//               label: 'סינון לפי תאריך',
//               icon: 'pi pi-fw pi-filter',
//               id:'0',
//               items: [
//                   {
//                       label: 'לא התקיים',
//                       icon: 'pi pi-fw pi-print',
//                       id:'2',
//                       command: () => this.s( 'לא התקיים')
//                   },
//                   {
//                     label: 'התקיים',
//                     icon: 'pi pi-fw pi-print',
//                     id:'3',
//                     command: () => this.s('התקיים')

//                   },
//               ]
//             },                                                 
//             {
//               label: 'מחיר',
//               icon: 'pi pi-fw pi-pencil',
//               id:'0',
//               items: [
//                   {
//                       label: 'נמיך ביותר',
//                       icon: 'pi pi-fw pi-align-left',
//                       id:'4',
//                       command: () => this.s('נמיך ביותר')
//                   },
//                   {
//                       label: 'גבוהה ביותר',
//                       icon: 'pi pi-fw pi-align-right',
//                       id:'5',
//                       command: () => this.s('גבוהה ביותר')

//                   },                   
//               ]
//             },
//             {
//                 label: 'סוג',
//                 icon: 'pi pi-fw pi-user',
//                 id:'6',
//             }
//             //     items: [
//             //         {
//             //             label: 'New',
//             //             icon: 'pi pi-fw pi-user-plus'
//             //         },
//             //         {
//             //             label: 'Delete',
//             //             icon: 'pi pi-fw pi-user-minus'
//             //         },
//             //         {
//             //             label: 'Search',
//             //             icon: 'pi pi-fw pi-users',
//             //             items: [
//             //                 {
//             //                     label: 'Filter',
//             //                     icon: 'pi pi-fw pi-filter',
//             //                     items: [
//             //                         {
//             //                             label: 'Print',
//             //                             icon: 'pi pi-fw pi-print'
//             //                         }
//             //                     ]
//             //                 },
//             //                 {
//             //                     icon: 'pi pi-fw pi-bars',
//             //                     label: 'List'
//             //                 }
//             //             ]
//             //         }
//             //     ]
//             // },
//             ,
//             {
//                 label: 'מיון תאריכים',
//                 icon: 'pi pi-fw pi-calendar',
//                 id:'0',
//                 items: [
//                     {
//                         label: 'הישן ביותר',
//                         icon: 'pi pi-fw pi-pencil',
//                         id:'7' ,
//                         command: () => this.s('הישן ביותר')                     
//                     },
//                     {
//                         label: 'החדש ביותר',
//                         icon: 'pi pi-fw pi-calendar-times',
//                       id:'8',
//                       command: () => this.s('החדש ביותר')

//                     }
//                 ]
//             }
//       ] 
//     }

//   s(filter:string){
// // console.log(event);
//   // this.selectedItem.emit(event.node)
//   // console.log(this.selectedItem);
  
  
//     // debugger
//     switch (filter) {
//      //2
//       case  'לא התקיים':
//         this.ListTrip.filter(trip => new Date(trip.dateTrip!) < new Date());
//         break;
//         //3
//         case 'התקיים':
//           this.ListTrip.filter(trip => new Date(trip.dateTrip!) > new Date());
//           // console.log("יש שני מפסרים");
//           break;
//           //4
//           case 'נמיך ביותר':
//             this.ListTrip.sort((a, b) => b.dateTrip!.getTime() - a.dateTrip!.getTime());

//             // this.priceDowm()
//             break;
//             //5
//             case  'גבוהה ביותר':
//               this.ListTrip.sort((a, b) => a.dateTrip!.getTime() - b.dateTrip!.getTime());
//               // this.priceUp()
//               break;

//               case ' ':
//                console.log('vfvgf');               
//                 break;
//                 case 'הישן ביותר':
//                   this.ListTrip.sort((a, b) => b.dateTrip!.getTime() - a.dateTrip!.getTime());
//                   // this.sortDateOpzit()
//                   break;
//                   case 'החדש ביותר':
//                     this.ListTrip.sort((a, b) => a.dateTrip!.getTime() - b.dateTrip!.getTime());
//                 // this.sortDate()
//                     break;
//       default:
//     }
//   }
// //   sortDate(){
// //     this.ListFilter.sort((a, b) => a.dateTrip!.getTime() - b.dateTrip!.getTime());
// //   }
// //   sortDateOpzit(){
// //     this.ListFilter.sort((a, b) => b.dateTrip!.getTime() - a.dateTrip!.getTime());
// //   }
// // priceDowm(){
// //   this.ListFilter.sort((a, b) => b.dateTrip!.getTime() - a.dateTrip!.getTime());
// // }
// // priceUp(){
// //   this.ListFilter.sort((a, b) => a.dateTrip!.getTime() - b.dateTrip!.getTime());
// // }
 

//       // filterByDate(filter: string) {
//       //   // Perform the filter logic based on the selected filter
//       //   console.log('Filter by date:', filter);
//       // }
//   }
//       // @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  
//       // closeCallback(e: any): void {
//       //     this.sidebarRef.close(e);
//       // // }
  
//       // sidebarVisible: boolean = false;
  