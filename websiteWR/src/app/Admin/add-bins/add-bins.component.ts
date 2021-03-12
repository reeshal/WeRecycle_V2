import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Bin } from 'src/app/General-User/Models/Bins';
import { environment } from 'src/environments/environment';
import { BinService } from '../Services/Bin/bin.service';

@Component({
  selector: 'app-add-bins',
  templateUrl: './add-bins.component.html',
  styleUrls: ['./add-bins.component.css'],
})
export class AddBinsComponent implements OnInit {
  constructor(private binsService: BinService, private fb: FormBuilder) {}

  map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/streets-v11';
  style = 'mapbox://styles/mapbox/light-v10';
  lat = -20.3476;
  lng = 57.3652;
  currentView = 'view';
  addBinForm!: FormGroup;
  binMaterials: string[] = [];
  marker: any;
  selectedLocation = {
    lat: 0,
    lng: 0,
  };

  isLoading2: boolean = false;

  ngOnInit() {
    this.addBinForm = this.fb.group({
      address: [null, Validators.required],
      selectedMaterial: [null, Validators.required],
    });

    this.fetchData();
  }
  fetchData(): void {
    const requests = forkJoin([
      this.binsService.getAllBins(),
      this.binsService.getBinMaterials(),
    ]);

    requests.subscribe(
      (data: [Array<Bin>, any]) => {
        this.map = new mapboxgl.Map({
          accessToken: environment.mapbox.accessToken,
          container: 'map',
          style: this.style,
          zoom: 10,
          center: [this.lng, this.lat],
        });
        this.map.on('click', (e) => {
          this.currentView = 'add';
          if (this.marker) this.marker.remove();
          this.selectedLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
          this.addMarker(e.lngLat.lat, e.lngLat.lng, 3);
        });

        this.binMaterials = Object.keys(data[1]);

        data[0].forEach((bin: Bin) => {
          const el = document.createElement('img');
          el.className = 'marker';
          el.src = `assets/images/logo.webp`;
          el.style.width = '40px';

          const m = new mapboxgl.Marker(el)
            .setLngLat([bin.longitude, bin.latitude])
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

  submitAddForm(): void {
    if (this.addBinForm.valid) {
      this.isLoading2 = true;

      this.binsService
        .addBin(
          this.selectedLocation.lat,
          this.selectedLocation.lng,
          this.addBinForm.get('selectedMaterial')?.value,
          this.addBinForm.get('address')?.value
        )
        .pipe(
          finalize(() => {
            this.isLoading2 = false;
          })
        )
        .subscribe(
          (data: any) => {
            this.fetchData();
            this.handleCancel();
          },
          (err: any) => {
            console.log(err.message);
          }
        );
    }
  }

  handleCancel() {
    if (this.marker) this.marker.remove();
    this.currentView = 'view';
    this.addBinForm.reset();
    this.selectedLocation = { lat: 0, lng: 0 };
  }
}
