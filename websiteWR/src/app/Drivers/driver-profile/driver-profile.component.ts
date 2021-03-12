import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DriverService } from '../Services/Driver/driver.service';
import { Driver} from '../Models/Driver.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {
  isLoading: boolean = true;
  showPasswordModal: boolean=false;
  driverObject: Driver;

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.fetchDriverDetail();
  }

  fetchDriverDetail(): void{
    this.driverService.getDriverDetails().pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    )
    .subscribe(   
      (data: Driver) => {
        this.driverObject=data;
        console.log(this.driverObject)
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  openUrl(url:string): void{
    window.open(`${environment.imageURL}${url}`, "_blank");
  }

  public togglePasswordModal = (fetchData: boolean): void => {
    this.showPasswordModal = !this.showPasswordModal;
    if (fetchData) this.fetchDriverDetail();
  };

}
