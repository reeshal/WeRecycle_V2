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
  binAllocations: BinAllocation[] = [];

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
        (data: any) => {
          this.binAllocations = data.map((a: any) => {
            return {
              pickup_id: a.pickups.id,
              pickup_status: a.pickups.status,
              pickup_date: a.pickups.date.slice(0, 10),
              driver: a.pickups.driver,
              pickupBins: a.pickupBins,
            };
          });
          console.log(this.binAllocations);
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
