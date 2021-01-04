import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Driver } from '../Models/Driver.model';
import { AllocationService } from '../Services/Allocation/allocation.service';
import { BinService } from '../Services/Bin/bin.service';
import { UserService } from '../Services/Users/user.service';

@Component({
  selector: 'app-allocate-drivers',
  templateUrl: './allocate-drivers.component.html',
  styleUrls: ['./allocate-drivers.component.css'],
})
export class AllocateDriversComponent implements OnInit {
  constructor(
    private userService: UserService,
    private binService: BinService
  ) {}

  isLoading: boolean = true;
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  selectedDriver: String = '';

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const requests = forkJoin([
      this.userService.getUsers(),
      this.binService.getFullUnallocatedBins(),
    ]);

    requests
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.drivers = data[0].filter((d: Driver) => d.type == 'driver');
          this.filteredDrivers = this.drivers;
          // console.log(this.drivers);
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDrivers = value
      ? this.drivers.filter(
          (d: any) => d.fullname.toLowerCase().indexOf(value) > -1
        )
      : [];
  }
}
