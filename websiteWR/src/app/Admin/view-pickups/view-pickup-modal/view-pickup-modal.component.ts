import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pickup } from '../../Models/Pickup.model';

@Component({
  selector: 'app-view-pickup-modal',
  templateUrl: './view-pickup-modal.component.html',
  styleUrls: ['./view-pickup-modal.component.css'],
})
export class ViewPickupModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.pickups = this.pickups.map((p: any) => {
      return {
        weight: p.weight ? p.weight : '-',
        imageBefore: `${environment.imageURL}${p.beforeImage}`,
        imageAfter: `${environment.imageURL}${p.afterImage}`,
      };
    });
  }

  @Input() pickups: any;
}
