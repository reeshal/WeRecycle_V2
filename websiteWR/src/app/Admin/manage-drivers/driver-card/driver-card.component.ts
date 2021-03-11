import { Component, OnInit, Input } from '@angular/core';
import { Driver } from '../../Models/Driver.model';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent implements OnInit {

  constructor() { }
  @Input() driverObject: Driver;

  ngOnInit(): void {
    console.log(this.driverObject);
  }

  openUrl(url:string){
    // alert(url);
    window.open(`${environment.imageURL}${url}`, "_blank");
  }

}
