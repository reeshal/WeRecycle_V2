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
  selectedDate = [new Date(), new Date()];
  pickups: any;
  filteredPickups: any;

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
          this.pickups = data
            .sort((a: Pickup, b: Pickup) => {
              if (a.date >= b.date) {
                return -1;
              }
              return 1;
            })
            .map((p: Pickup) => {
              return p.pickups.map((z) => {
                return {
                  date: new Date(this.formatDisplayDate(p.date)),
                  driverId: p.driverId,
                  weight: z.weight ? z.weight : '-',
                  imageBefore: `${environment.imageURL}${z.beforeImage}`,
                  imageAfter: `${environment.imageURL}${z.afterImage}`,
                };
              })[0];
            });
          console.log(this.pickups);
          this.filterPickupsByDate();
        },
        (err: any) => {
          console.log(err.message);
        }
      );
  }

  onChange(result: Date[]): void {
    // console.log('onChange: ', result);
    this.selectedDate = result;
    this.filterPickupsByDate();
  }

  filterPickupsByDate(): void {
    const startDate = new Date(this.formatDisplayDate(this.selectedDate[0]));
    const endDate = new Date(this.formatDisplayDate(this.selectedDate[1]));
    this.filteredPickups = this.pickups.filter(
      (p: any) => p.date >= startDate && p.date <= endDate
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

  formatDisplayDate(d: Date) {
    return formatDate(d, 'dd MMMM YYYY', 'en-US');
  }
}
