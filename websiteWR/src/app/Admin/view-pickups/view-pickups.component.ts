import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pickup } from '../Models/Pickup.model';
import { PickupService } from '../Services/Pickup/pickup.service';

@Component({
  selector: 'app-view-pickups',
  templateUrl: './view-pickups.component.html',
  styleUrls: ['./view-pickups.component.css'],
})
export class ViewPickupsComponent implements OnInit {
  constructor(private pickupService: PickupService) {}

  isLoading: boolean = true;

  pickupsByDate = new Map();
  pickupDates: any;

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
          data.forEach((d: Pickup) => {
            const formattedDate = formatDate(d.date, 'dd MMMM YYYY', 'en-US');
            if (this.pickupsByDate.has(formattedDate)) {
              this.pickupsByDate.set(formattedDate, [
                ...this.pickupsByDate.get(formattedDate),
                d,
              ]);
            } else {
              this.pickupsByDate.set(formattedDate, [d]);
            }
          });
          this.pickupDates = this.pickupsByDate.keys();
        },
        (err: any) => {
          console.log(err.message);
        }
      );
  }

  getPickups(d: Date): any {
    const pickups: Pickup[] = this.pickupsByDate.get(d);

    const result = pickups.map((p: Pickup) => {
      return p.pickups.map((z) => {
        return {
          driverId: p.driverId,
          weight: z.weight ? z.weight : '-',
          imageBefore: `${environment.imageURL}${z.beforeImage}`,
          imageAfter: `${environment.imageURL}${z.afterImage}`,
        };
      })[0];
    });
    return result;
  }
}
