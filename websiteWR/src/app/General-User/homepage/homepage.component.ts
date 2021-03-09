import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bin } from '../Models/Bins';
import { BinService } from '../Services/bin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(private binsService: BinService) {}

  map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/streets-v11';
  style = 'mapbox://styles/mapbox/light-v10';
  lat = -20.3476;
  lng = 57.3652;

  isLoading: boolean = true;

  ngOnInit() {
    this.binsService
      .getAllBins()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
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

            var popup = new mapboxgl.Popup({
              offset: 25,
              closeButton: false,
            }).setText('Material: ' + bin.material);

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
}
