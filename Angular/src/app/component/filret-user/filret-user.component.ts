import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trips } from 'src/app/class/Trip';
import { TypeOfTrip } from 'src/app/class/TypeOfTrip';
import { TripSer } from 'src/app/service/TripSer.service';
import { TypeSer } from 'src/app/service/TypeSer.service';
import { UserSer } from 'src/app/service/UserSer.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-filret-user',
  templateUrl: './filret-user.component.html',
  styleUrls: ['./filret-user.component.css']
})
export class FilretUserComponent implements OnInit{
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
  // this.servTrip.getAllTrip().subscribe(
  //   succ => {
  //     this.ListTrip = succ;
  //     this.serUse.ListFilter = succ;
  //     console.log(this.ListTrip);
  //   },
  // );


//אובייקט המראה את המודל של אפשרויות הסינון והמיון 
 this.items  = [
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
    debugger
    this.sidebarVisible = false
    switch (filter) {
      case  'לא התקיים':
        {
          this.ListFilter = this.serUse.ListTrip;
          this.serUse.ListFilter = this.getTripNotPassedDate(this.serUse.ListTrip)
          // this.sidebarVisible = false
          this.r.navigate(['/TripPerUser'])
        }
        break;
        case 'התקיים':
          {       
            this.serUse.ListFilter = this.serUse.ListTrip;
            this.serUse.ListFilter = this.getTripPassedDate(this.serUse.ListTrip)
            // this.sidebarVisible = false
            this.r.navigate(['/TripPerUser'])
          }         
        break;
        case 'נמיך ביותר':
          {   
            this.ListFilter = this.serUse.ListTrip;
            this.serUse.ListFilter = this.ListFilter.sort((a, b) => a.price! - b.price!);
            // this.sidebarVisible = false             
            this.r.navigate(['/TripPerUser'])
          }
        break;    
        case  'גבוהה ביותר':
          {            
            this.ListFilter = this.serUse.ListTrip;
            this.serUse.ListFilter = this.ListFilter.sort((a, b) => b.price! - a.price!);
            // this.sidebarVisible = false
            this.r.navigate(['/TripPerUser'])
          }             
        break;
        case 'הישן ביותר':
          {
            this.ListFilter = this.serUse.ListTrip;
            this.serUse.ListFilter = this.sortOldestToNewest(this.serUse.ListTrip)
            // this.sidebarVisible = false
            this.r.navigate(['/TripPerUser'])
          }                 
        break;
        case 'החדש ביותר':
          {
            this.ListFilter = this.serUse.ListTrip;
            this.serUse.ListFilter = this.sortNewestToOldest(this.serUse.ListTrip)
            // this.sidebarVisible = false
            this.r.navigate(['/TripPerUser'])
          }            
        break;
        default:
          {
          //סינון לפי סוג
            const a = parseInt(filter)
            this.ListFilter = this.serUse.ListTrip;
            this.serType.getTripByIdTypeBLLAsync(a!).subscribe(
              succ => { this.ListFilter = succ; console.log(this.serUse.ListTrip) ;
              this.serUse.ListFilter = succ;
            });
            // this.sidebarVisible = false
            this.r.navigate(['/TripPerUser'])
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
 


