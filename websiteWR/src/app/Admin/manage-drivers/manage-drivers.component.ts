import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/Users/user.service';
import { finalize } from 'rxjs/operators';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Driver} from '../Models/Driver.model';

@Component({
  selector: 'app-manage-drivers',
  templateUrl: './manage-drivers.component.html',
  styleUrls: ['./manage-drivers.component.css']
})
export class ManageDriversComponent implements OnInit {
  isLoading: boolean = true;
  search: string = "";
  size: NzButtonSize = 'default';

  showClearButton = false;

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

}
