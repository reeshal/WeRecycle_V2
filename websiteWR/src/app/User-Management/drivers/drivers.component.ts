import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Drivers} from '../Models/drivers';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  isLoading: boolean = true;
  search: string = "";
  size: NzButtonSize = 'default';

  showClearButton = false;
  showAddDriverModal: boolean = false;

  rows:Array<Drivers> = [];
  filteredRows:Array<Drivers> = [];

  constructor(private modal: NzModalService,private usersService: UsersService) { }

  ngOnInit(): void {
    this.fetchDrivers();
  }

  fetchDrivers(): void {
    this.usersService.getRegUsers().pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    )
    .subscribe(   
      (data: Array<Drivers>) => {
        this.rows=data.filter(d=>d.type=="driver");
        this.filteredRows=this.rows;
        console.log(this.filteredRows);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  applySearch(event:any) {
    const val = event.target.value.toLowerCase();
    this.showClearButton = true;
    // filter our data
    const temp = this.rows.filter((d:Drivers)=> {
      return (d.fullname.toLowerCase().indexOf(val) !== -1 || !val)
      ||(d.phoneno.toLowerCase().indexOf(val) !== -1 || !val)
      ||(d.address.toLowerCase().indexOf(val) !== -1 || !val);
    });
    // update the rows
    this.filteredRows = temp;
  }

  clearFilter():void{
    this.showClearButton=false;
    this.filteredRows=this.rows;
    this.search="";
  }

  handleStatusChange(phoneno: string, status: string):void{
    this.modal.confirm({
      nzTitle: 'Change Status of User?',
      nzContent: 'Are you sure?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.usersService.changeStatusUser(phoneno,status).pipe(finalize(
          ()=>{
            this.fetchDrivers();
          }
        )).subscribe(
          () => {
            this.modal.success({
              nzTitle: 'Success',
              nzContent: 'User status has been changed'
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


  public toggleAddDriverModal = (fetchData: boolean): void => {
    this.showAddDriverModal = !this.showAddDriverModal;
    if (fetchData) this.fetchDrivers();
  };


}
