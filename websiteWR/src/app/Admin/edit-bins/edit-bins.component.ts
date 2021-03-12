import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Bin } from '../Models/Bin.model';
import { BinService } from '../Services/Bin/bin.service';

@Component({
  selector: 'app-edit-bins',
  templateUrl: './edit-bins.component.html',
  styleUrls: ['./edit-bins.component.css'],
})
export class EditBinsComponent implements OnInit {
  constructor(private binsService: BinService) {}

  map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/streets-v11';
  style = 'mapbox://styles/mapbox/light-v10';
  lat = -20.3476;
  lng = 57.3652;
  currentView = 'view';
  marker: any;

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.binsService.getAllBins().subscribe(
      (data: Array<Bin>) => {
        this.map = new mapboxgl.Map({
          accessToken: environment.mapbox.accessToken,
          container: 'map',
          style: this.style,
          zoom: 10,
          center: [this.lng, this.lat],
        });

        data.forEach((bin: Bin) => {
          const el = document.createElement('img');
          el.className = 'marker';
          el.src = `assets/images/logo.webp`;
          el.style.width = '40px';

          var delBtn = document.createElement('BUTTON');
          delBtn.innerHTML = 'Delete';
          delBtn.addEventListener('click', () => this.handleDelete(bin.id));
          var popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
          }).setDOMContent(delBtn);

          new mapboxgl.Marker(el)
            .setLngLat([bin.longitude, bin.latitude])
            .setPopup(popup)
            .addTo(this.map);
        });
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }
  addMarker(lat: number, lng: number, status: number) {
    const el = document.createElement('img');
    el.className = 'marker';
    el.src = `assets/images/bin-${status}.png`;
    el.style.width = '30px';

    this.marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(this.map);
  }

  handleDelete(binId: number): void {
    this.binsService.deleteBin(binId).subscribe(
      (data) => {
        this.fetchData();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }
}
