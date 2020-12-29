import { Component, OnInit , Input} from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css']
})
export class MapModalComponent implements OnInit {
  @Input() showMapModal: boolean=false;
  @Input() toggleMapModal: Function = ()=>{};
  @Input() latitude: number = -20; //default initialised
  @Input() longitude: number = 57; //default initialised

  constructor() { }

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'mapbox',
      accessToken: environment.mapbox.accessToken,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [this.latitude, this.longitude],
    });
    console.log([this.latitude, this.longitude])
    const el = document.createElement('img');
    el.className = 'marker';
    el.src = `assets/images/bin-3.png`;
    el.style.width = '40px';
    new mapboxgl.Marker(el)
      .setLngLat([this.latitude, this.longitude])
      .addTo(map);
  }

  handleCancel(): void {
    this.showMapModal = false;
    this.toggleMapModal();
  }

}
