import { Component, OnInit , Input} from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css']
})
export class MapModalComponent implements OnInit {

  @Input() latitude: number = -20; //default initialised
  @Input() longitude: number = 57; //default initialised

  constructor() { }

  ngOnInit(): void {
    console.log('hello')
    console.log([this.latitude, this.longitude])
    const map = new mapboxgl.Map({
      container: 'mapbox',
      accessToken: environment.mapbox.accessToken,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
      center: [-20,57],
    });
    const el = document.createElement('img');
    el.className = 'marker';
    el.src = `assets/images/bin-3.png`;
    el.style.width = '40px';
    new mapboxgl.Marker(el)
      .setLngLat([-20,57])
      .addTo(map);
  }

}
