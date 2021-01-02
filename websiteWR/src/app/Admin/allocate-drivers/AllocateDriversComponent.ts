import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
          console.log(data);
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
