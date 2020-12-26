import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PickupBin } from '../../Models/PickupBin.model';

@Component({
  selector: 'app-pickup-bin-dialog',
  templateUrl: './pickup-bin-dialog.component.html',
  styleUrls: ['./pickup-bin-dialog.component.css'],
})
export class PickupBinDialogComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  @Input() pickupBins: PickupBin[] = [];

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${url}`
    );
  }
}
