import { Component, OnInit } from '@angular/core';
import { Prices } from '../Models/Prices';

@Component({
  selector: 'app-all-prices',
  templateUrl: './all-prices.component.html',
  styleUrls: ['./all-prices.component.css']
})
export class AllPricesComponent implements OnInit {
  listPrices: Array<Prices> =[];  
  constructor() { }

  ngOnInit(): void {
    let reg1: Prices ={
      imageUrl: 'assets/images/blackriver.jpg',
      regionName:'Black River',
      regionPrice:'Rs 1500'
    }
    let reg2: Prices ={
      imageUrl: 'assets/images/portlouis.jpg',
      regionName:'Port Louis',
      regionPrice:'Rs 3500'
    }
    let reg3: Prices ={
      imageUrl: 'assets/images/quatrebornes.jpg',
      regionName:'Quatre Bornes',
      regionPrice:'Rs 2500'
    }
    let reg4: Prices ={
      imageUrl: 'assets/images/rosehill.jpg',
      regionName:'Rose Hill',
      regionPrice:'Rs 2500'
    }
    let reg5: Prices ={
      imageUrl: 'assets/images/beaubassin.jpg',
      regionName:'Beau Bassin',
      regionPrice:'Rs 2500'
    }
    let reg6: Prices ={
      imageUrl: 'assets/images/vacoas.jpg',
      regionName:'Vacoas',
      regionPrice:'Rs 2500'
    }
    this.listPrices.push(reg1, reg2, reg3, reg4, reg5, reg6);
  }

}
