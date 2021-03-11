import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Driver } from '../../Models/Driver.model';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../Services/Users/user.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.css']
})
export class DriverCardComponent implements OnInit {

  constructor(private modal: NzModalService,private usersService: UserService) { }
  @Input() driverObject: Driver;
  @Input() refreshPage: Function = ()=>{};

  ngOnInit(): void {
  }

  openUrl(url:string): void{
    window.open(`${environment.imageURL}${url}`, "_blank");
  }

  updateDriverStatus(driverId: number, status:string): void{
    this.modal.confirm({
      nzTitle: 'Change Status of User?',
      nzContent: 'Are you sure?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.usersService.updateStatus(driverId,status).pipe(finalize(
          ()=>{
            // this.fetchDrivers();
            this.refreshPage(true);
          }
        )).subscribe(
          () => {
            this.modal.success({
              nzTitle: 'Success',
              nzContent: 'Driver status has been changed'
            });
          },
          (err) => {
            this.modal.error({
              nzTitle: 'Error',
              nzContent: 'Your request failed due to connectivity issues'
            });
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }

}
