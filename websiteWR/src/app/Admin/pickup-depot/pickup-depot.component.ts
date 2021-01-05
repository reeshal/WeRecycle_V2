import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AllocationService } from '../Services/Allocation/allocation.service';

@Component({
  selector: 'app-pickup-depot',
  templateUrl: './pickup-depot.component.html',
  styleUrls: ['./pickup-depot.component.css'],
})
export class PickupDepotComponent implements OnInit {
  isLoading: boolean = true;
  garageCoordinates: { lng: number; lat: number } = { lat: 0, lng: 0 };

  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';

  constructor(private allocationService: AllocationService) {}

  ngOnInit(): void {
    this.allocationService
      .getGarageLocation()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.garageCoordinates = data;

          this.map = new mapboxgl.Map({
            accessToken: environment.mapbox.accessToken,
            container: 'map',
            style: this.style,
            zoom: 10,
            center: [this.garageCoordinates.lng, this.garageCoordinates.lat],
          });

          const homeEle = document.createElement('img');
          homeEle.className = 'marker';
          homeEle.src = `assets/images/home.png`;
          homeEle.style.width = '55px';

          new mapboxgl.Marker(homeEle)
            .setLngLat([this.garageCoordinates.lng, this.garageCoordinates.lat])
            .addTo(this.map);
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
