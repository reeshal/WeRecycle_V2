import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BinAllocation } from '../Models/BinAllocation.model';
import { AllocationService } from '../Services/Allocation/allocation.service';

@Component({
  selector: 'app-view-bin-allocation',
  templateUrl: './view-bin-allocation.component.html',
  styleUrls: ['./view-bin-allocation.component.css'],
})
export class ViewBinAllocationComponent implements OnInit {
  constructor(private allocationService: AllocationService) {}

  isLoading: boolean = true;

  ngOnInit(): void {
    this.fetchAllocations();
  }

  fetchAllocations(): void {
    this.allocationService
      .getDriverAllocations()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: BinAllocation) => {
          console.log(data);
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
