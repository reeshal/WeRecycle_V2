import { Component, OnInit } from '@angular/core';
import { BinService }  from '../Services/bin.service';
import { Bin } from '../Models/Bins';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
// import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-all-bins',
  templateUrl: './all-bins.component.html',
  styleUrls: ['./all-bins.component.css']
})
export class AllBinsComponent implements OnInit {

  constructor(private stationService: BinService) { }

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  // style = 'mapbox://styles/mapbox/light-v12';
  lat = -20.2349416;
  lng = 57.49629944;

  selected_station: Bin;
  isLoading: boolean = true;
  
  ngOnInit() {
    this.stationService.getAllBins().subscribe(
      (stations: Array<Bin>) => {
        this.isLoading = false;
        console.log(stations);
        this.map = new mapboxgl.Map({
          accessToken: environment.mapbox.accessToken,
          container: 'map',
          style: this.style,
          zoom: 10,
          center: [this.lng, this.lat],
        });

        // this.map.addControl(
        //   new MapboxGeocoder({
        //     accessToken: environment.mapbox.accessToken,
        //     countries: 'mu',
        //     mapboxgl: mapboxgl,
        //   })
        // );
        this.selected_station = stations[stations.length - 1];

        stations.forEach((station: Bin) => {
          const el = document.createElement('img');
          el.className = 'marker';
          el.src = `assets/images/bin-${station.full ? 1 : 0}.png`;
          el.style.width = '30px';
          el.onclick = () => {
            this.selected_station = station;
          };
          new mapboxgl.Marker(el)
            .setLngLat([station.lng, station.lat])
            .addTo(this.map);
        });
      },
      (err) => {
        this.isLoading = false;
        console.log(err.message);
      }
    );
  }

}
