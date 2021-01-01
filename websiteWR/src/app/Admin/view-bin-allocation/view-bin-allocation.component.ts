import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BinAllocation } from '../Models/BinAllocation.model';
import { PickupBin } from '../Models/PickupBin.model';
import { AllocationService } from '../Services/Allocation/allocation.service';
import { PickupBinDialogComponent } from './pickup-bin-dialog/pickup-bin-dialog.component';
import { RouteDialogComponent } from './route-dialog/route-dialog.component';

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
  garageLocation: { lat: number; lng: number } = { lat: 0, lng: 0 };

  ngOnInit(): void {
    this.fetchAllocations();
  }

  fetchAllocations(): void {
    const requests = forkJoin([
      this.allocationService.getDriverAllocations(),
      this.allocationService.getGarageLocation(),
    ]);
    requests
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          // console.log(data);
          this.garageLocation = data[1];
          this.binAllocations = data[0]
            .filter((b: any) => b.pickups.status != 'approved') // get only pending & declined
            .map((a: any) => {
              return {
                pickup_id: a.pickups.id,
                pickup_status: a.pickups.status,
                pickup_date: a.pickups.date,
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
    this.modal.create({
      nzTitle: '',
      nzWidth: 1200,
      nzContent: PickupBinDialogComponent,
      nzComponentParams: {
        pickupBins: bins,
      },
    });
  }

  showRouteModal(bins: PickupBin[]): void {
    this.modal.create({
      nzTitle: '',
      nzWidth: 1200,
      nzContent: RouteDialogComponent,
      nzComponentParams: {
        pickupBins: bins,
        garageLocation: this.garageLocation,
      },
    });
  }

  handleAction(pickup_id: number, status: number) {
    this.isLoading = true;
    this.allocationService
      .changePickupStatus(pickup_id, status == 0 ? 'rejected' : 'approved')
      .subscribe(
        (data) => {
          this.fetchAllocations();
        },
        (err) => {
          this.isLoading = false;
          console.log(err.message);
        }
      );
  }
}
