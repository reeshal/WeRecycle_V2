import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bin } from '../Models/Bin.model';
import { Driver } from '../Models/Driver.model';
import { BinService } from '../Services/Bin/bin.service';
import { MapboxService } from '../Services/Map/map.service';
import { UserService } from '../Services/Users/user.service';
import * as turf from 'turf';
import { AllocationService } from '../Services/Allocation/allocation.service';
import { DatePipe } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-allocate-drivers',
  templateUrl: './allocate-drivers.component.html',
  styleUrls: ['./allocate-drivers.component.css'],
})
export class AllocateDriversComponent implements OnInit {
  constructor(
    private userService: UserService,
    private binService: BinService,
    private mapService: MapboxService,
    private allocationService: AllocationService,
    private modal: NzModalService
  ) {}

  isLoading: boolean = true;
  // TODO: Fix type
  // drivers: Driver[] = [];
  // filteredDrivers: Driver[] = [];
  drivers: any;
  filteredDrivers: any;
  selectedDriver: any;
  bins: Bin[] = [];

  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  lat = -20.2349416;
  lng = 57.49629944;

  selectedBins: Bin[] = [];
  garageCoordinates: { lng: number; lat: number } = { lat: 0, lng: 0 };
  nothing = turf.featureCollection([]);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const requests = forkJoin([
      this.userService.getUsers(),
      this.binService.getFullUnallocatedBins(),
      this.allocationService.getGarageLocation(),
    ]);

    requests
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.drivers = data[0].filter((d: Driver) => d.type == 'driver');
          this.filteredDrivers = this.drivers;
          this.bins = data[1];
          this.garageCoordinates = data[2];
          this.createMap();
        },
        (err) => {
          console.log(err.message);
        }
      );
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDrivers = value
      ? this.drivers.filter(
          (d: any) => d.fullname.toLowerCase().indexOf(value) > -1
        )
      : [];
  }

  createMap() {
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

    this.map.on('load', () => {
      this.createBinMarkers();

      this.map.addSource('route', {
        type: 'geojson',
        data: this.nothing,
      });
      this.map.addLayer(
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
            'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12],
          },
        },
        'waterway-label'
      );

      this.map.addLayer(
        {
          id: 'routearrows',
          type: 'symbol',
          source: 'route',
          layout: {
            'symbol-placement': 'line',
            'text-field': '▶',
            'text-size': ['interpolate', ['linear'], ['zoom'], 12, 24, 22, 60],
            'symbol-spacing': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              30,
              22,
              160,
            ],
            'text-keep-upright': false,
          },
          paint: {
            'text-color': '#3887be',
            'text-halo-color': 'hsl(55, 11%, 96%)',
            'text-halo-width': 3,
          },
        },
        'waterway-label'
      );
    });
  }

  createBinMarkers() {
    const homeEle = document.createElement('img');
    homeEle.className = 'marker';
    homeEle.src = `assets/images/home.png`;
    homeEle.style.width = '55px';

    new mapboxgl.Marker(homeEle)
      .setLngLat([this.garageCoordinates.lng, this.garageCoordinates.lat])
      .addTo(this.map);

    this.bins.forEach((station: Bin) => {
      const el = document.createElement('img');
      el.className = 'marker';
      el.src = `assets/images/bin-${station.full ? 1 : 0}.png`;
      el.style.width = '30px';
      el.onclick = () => {
        if (
          this.selectedBins.filter((b: Bin) => b.id == station.id).length == 0
        ) {
          this.selectedBins.push(station);
          el.src = `assets/images/bin-${2}.png`;

          if (this.selectedBins.length > 0 && this.selectedBins.length <= 12) {
            this.createRoute();
          }
        }
      };
      new mapboxgl.Marker(el)
        .setLngLat([station.lng, station.lat])
        .addTo(this.map);
    });
  }

  createRoute() {
    const coordinates = this.selectedBins.map((b) => {
      return {
        lng: b.lng,
        lat: b.lat,
      };
    });
    this.mapService
      .getOptimisedRoute([
        { lng: this.garageCoordinates.lng, lat: this.garageCoordinates.lat },
        ...coordinates,
      ])
      .subscribe(
        (data) => {
          console.log();
          var routeGeoJSON = turf.featureCollection([
            turf.feature(data.trips[0].geometry),
          ]);

          // If there is no route provided, reset
          if (!data.trips[0]) {
            routeGeoJSON = this.nothing;
          } else {
            let s: any = this.map.getSource('route');
            s.setData(routeGeoJSON);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  handleCancel(): void {
    this.selectedBins = [];
    this.selectedDriver = '';
    this.nothing = turf.featureCollection([]);
    let s: any = this.map.getSource('route');
    s.setData(this.nothing);
    this.createBinMarkers();
    this.filteredDrivers = this.drivers;
  }

  handleSubmit(): void {
    var datePipe = new DatePipe('en-US');
    const data = {
      driverPhoneNumber: this.selectedDriver['phoneno'],
      bins: this.selectedBins.map((b) => b.id),
      date: datePipe.transform(new Date(), 'dd/MM/yyyy') || '',
    };

    this.isLoading = true;
    this.allocationService
      .allocateDriver(data.driverPhoneNumber, data.bins, data.date)
      .subscribe(
        (data) => {
          console.log(data);
          this.modal.info({
            nzTitle: 'Success',
            nzContent: '<p>Driver allocation for pickups completed.</p>',
            nzOnOk: () => {
              this.fetchData();
              this.handleCancel();
            },
          });
        },
        (err) => {
          console.log(err.message);
        }
      );
  }
}
