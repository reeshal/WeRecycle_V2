import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pickup } from '../Models/Pickup.model';
import { PickupService } from '../Services/Pickup/pickup.service';
import { ImageModalComponent } from './image-modal/image-modal.component';

@Component({
  selector: 'app-view-pickups',
  templateUrl: './view-pickups.component.html',
  styleUrls: ['./view-pickups.component.css'],
})
export class ViewPickupsComponent implements OnInit {
  constructor(
    private pickupService: PickupService,
    private modal: NzModalService
  ) {}

  isLoading: boolean = true;
  selectedDate = new Date();
  pickups: any;
  filteredPickups: any;
  // ,
  ngOnInit() {
    this.pickupService
      .getPickups()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: Pickup[]) => {
          this.pickups = data.map((p: Pickup) => {
            return p.pickups.map((z) => {
              return {
                date: formatDate(p.date, 'dd MMMM YYYY', 'en-US'),
                driverId: p.driverId,
                weight: z.weight ? z.weight : '-',
                imageBefore: `${environment.imageURL}${z.beforeImage}`,
                imageAfter: `${environment.imageURL}${z.afterImage}`,
              };
            })[0];
          });

          this.filterPickupsByDate();
        },
        (err: any) => {
          console.log(err.message);
        }
      );
  }
  onChange(result: Date): void {
    this.selectedDate = result;
    this.filterPickupsByDate();
  }

  filterPickupsByDate(): void {
    this.filteredPickups = this.pickups.filter(
      (p: any) =>
        p.date == formatDate(this.selectedDate, 'dd MMMM YYYY', 'en-US')
    );
  }

  createImageModal(urlBefore: string, urlAFter: string): void {
    this.modal.create({
      nzTitle: 'Images uploaded by driver',
      nzContent: ImageModalComponent,
      nzClosable: false,
      nzComponentParams: {
        imageBefore: urlBefore,
        imageAfter: urlAFter,
      },
    });
  }
}
