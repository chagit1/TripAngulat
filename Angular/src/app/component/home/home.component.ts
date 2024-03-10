import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { EMPTY, empty } from 'rxjs';
import { Trips } from 'src/app/class/Trip';
import { TripSer } from 'src/app/service/TripSer.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  sortOptions: SelectItem[] = new Array()
  sortOrder: number = 0
  sortField: string = ""
  products: Trips[] = new Array()

  constructor(private serTrip: TripSer) { }

  ngOnInit() {
   
    debugger
    this.serTrip.getAllTrip().subscribe(
      succ => {
        this.products = succ
        console.log(this.products);
      }
    );
    console.log(this.products);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!dateTrip' },
      { label: 'Price Low to High', value: 'dateTrip' }
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  // getSeverity(product: Trips) {
  //   switch (product.inventoryStatus) {
  //     case 'INSTOCK':
  //       return 'success';

  //     case 'LOWSTOCK':
  //       return 'warning';

  //     case 'OUTOFSTOCK':
  //       return 'danger';

  //     default:
  //       return null;
  //   }
  // };

}
