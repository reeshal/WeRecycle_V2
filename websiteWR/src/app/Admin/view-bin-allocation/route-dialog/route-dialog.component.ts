import { Component, Input, OnInit } from '@angular/core';
import { PickupBin } from '../../Models/PickupBin.model';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-route-dialog',
  templateUrl: './route-dialog.component.html',
  styleUrls: ['./route-dialog.component.css'],
})
export class RouteDialogComponent implements OnInit {
  constructor() {}

  lat = -20.2349416;
  lng = 57.49629944;

  @Input() pickupBins: PickupBin[] = [];

  ngOnInit() {
    const newData = this.pickupBins.map((d) => {
      return {
        lat: d.bin.lat,
        lng: d.bin.lng,
      };
    });
    const map = new mapboxgl.Map({
      container: 'map',
      accessToken: environment.mapbox.accessToken,
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 10,
      center: [this.lng, this.lat],
    });

    newData.forEach((bin) => {
      const el = document.createElement('img');
      el.className = 'marker';
      el.src = `assets/images/bin-1.png`;
      el.style.width = '40px';
      new mapboxgl.Marker(el).setLngLat([bin.lng, bin.lat]).addTo(map);
    });
  }
}
