import { Component, OnInit, Input } from '@angular/core';
import { Driver } from '../../Models/Driver.model';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent implements OnInit {

  constructor() { }
  @Input() driverObject: Driver;
  // @Input() id:string ='';
  // @Input() idCardUrl:string ='';
  // @Input() drivingLicenseUrl:string ='';
  // @Input() proofOfAddressUrl:string ='';
  // @Input() phoneNumber:string ='';
  // @Input() phoneNumber:string ='';


  ngOnInit(): void {
    console.log(this.driverObject);
  }

}
