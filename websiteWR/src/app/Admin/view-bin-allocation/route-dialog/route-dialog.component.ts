import { Component, Input, OnInit } from '@angular/core';
import { PickupBin } from '../../Models/PickupBin.model';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapboxService } from '../../Services/Map/map.service';
import { finalize } from 'rxjs/operators';
import * as turf from 'turf';

@Component({
  selector: 'app-route-dialog',
  templateUrl: './route-dialog.component.html',
  styleUrls: ['./route-dialog.component.css'],
})
export class RouteDialogComponent implements OnInit {
  constructor(private mapboxService: MapboxService) {}

  lat = -20.2349416;
  lng = 57.49629944;
  @Input() pickupBins: PickupBin[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    const binsCoordinates = this.pickupBins.map((d) => {
      return {
        lng: d.bin.lng,
        lat: d.bin.lat,
      };
    });

    this.mapboxService
      .getOptimisedRoute(binsCoordinates)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          const map = new mapboxgl.Map({
            container: 'map',
            accessToken: environment.mapbox.accessToken,
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 10,
            center: [this.lng, this.lat],
          });

          map.on('load', () => {
            // Show bins
            binsCoordinates.forEach((bin: any) => {
              const el = document.createElement('img');
              el.className = 'marker';
              el.src = `assets/images/bin-1.png`;
              el.style.width = '40px';
              new mapboxgl.Marker(el).setLngLat([bin.lng, bin.lat]).addTo(map);
            });

            // Display route
            map.addSource('route', {
              type: 'geojson',
              data: turf.featureCollection(data['trips']),
            });
            map.addLayer(
              {
                id: 'routeline-active',
                type: 'line',
                source: 'route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': '#00FF00',
                  'line-width': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12,
                    3,
                    22,
                    12,
                  ],
                },
              },
              'waterway-label'
            );
          });
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
