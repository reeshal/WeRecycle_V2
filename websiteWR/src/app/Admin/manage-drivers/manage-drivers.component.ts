import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/Users/user.service';
import { finalize } from 'rxjs/operators';
// import { NzButtonSize } from 'ng-zorro-antd/button';
import { Driver} from '../Models/Driver.model';

@Component({
  selector: 'app-manage-drivers',
  templateUrl: './manage-drivers.component.html',
  styleUrls: ['./manage-drivers.component.css']
})
export class ManageDriversComponent implements OnInit {
  isLoading: boolean = true;
  // search: string = "";
  // size: NzButtonSize = 'default';
  // selectedStatus:any;
  // showClearButton = false;

  rows:Array<Driver> = [];
  filteredRows:Array<Driver> = [];

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.fetchDrivers();
  }

  fetchDrivers(): void {
    this.usersService.getDrivers().pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    )
    .subscribe(   
      (data: Array<Driver>) => {
        this.rows=data;
        this.filteredRows=this.rows;
        console.log(this.filteredRows);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  // applySearch(event:any) {
  //   const val = event.target.value.toLowerCase();
  //   this.showClearButton = true;
  //   // filter our data
  //   const temp = this.rows.filter((d:Driver)=> {
  //     return (d.firstName.toLowerCase().indexOf(val) !== -1 || !val)
  //     ||(d.lastName.toLowerCase().indexOf(val) !== -1 || !val)
  //     ||(d.phoneNumber.indexOf(val) !== -1 || !val);
  //   });
  //   // update the rows
  //   this.filteredRows = temp;
  // }

  // handleStatusChange(): void{
  //   console.log(this.selectedStatus);
  //   this.showClearButton = true;
  //   this.selectedStatus== 'All' ? this.filteredRows = this.rows :
  //     this.filteredRows = this.rows.filter((b:Driver) => b.status === this.selectedStatus);
  // }

  // clearFilter():void{
  //   this.showClearButton=false;
  //   this.filteredRows=this.rows;
  //   this.search="";
  // }

}
