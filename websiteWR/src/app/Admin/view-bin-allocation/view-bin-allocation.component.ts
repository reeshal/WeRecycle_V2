import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { BinAllocation } from '../Models/BinAllocation.model';
import { PickupBin } from '../Models/PickupBin.model';
import { AllocationService } from '../Services/Allocation/allocation.service';
import { PickupBinDialogComponent } from './pickup-bin-dialog/pickup-bin-dialog.component';

@Component({
  selector: 'app-view-bin-allocation',
  templateUrl: './view-bin-allocation.component.html',
  styleUrls: ['./view-bin-allocation.component.css'],
})
export class ViewBinAllocationComponent implements OnInit {
  constructor(
    private allocationService: AllocationService,
    private modal: NzModalService
  ) {}

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
          // console.log(data);
          this.binAllocations = data.map((a: any) => {
            return {
              pickup_id: a.pickups.id,
              pickup_status: a.pickups.status,
              pickup_date: a.pickups.date.slice(0, 10),
              driver: a.pickups.driver,
              pickupBins: a.pickupBins,
            };
          });
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

  showPickupModal(bins: PickupBin[]): void {
    console.log(bins);
    this.modal.info({
      nzTitle: 'Bins To Pickup',
      nzWidth: 800,
      nzContent: PickupBinDialogComponent,
      nzComponentParams: {
        pickupBins: bins,
      },
    });
  }
}
