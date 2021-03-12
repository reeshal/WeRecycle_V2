import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bin } from '../Models/Bin.model';
import { BinService } from '../Services/Bin/bin.service';

@Component({
  selector: 'app-edit-bins',
  templateUrl: './edit-bins.component.html',
  styleUrls: ['./edit-bins.component.css'],
})
export class EditBinsComponent implements OnInit {
  constructor(private binsService: BinService, private fb: FormBuilder) {}

  map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/streets-v11';
  style = 'mapbox://styles/mapbox/light-v10';
  lat = -20.3476;
  lng = 57.3652;
  currentView = 'view';
  marker: any;
  selectedBin: Bin;
  selectedLocation = {
    lat: 0,
    lng: 0,
  };
  binMaterials: string[] = [];
  isLoading2: boolean = false;
  editBinForm!: FormGroup;
  clickCount: number = 0;

  ngOnInit() {
    this.editBinForm = this.fb.group({
      address: [null, Validators.required],
      selectedMaterial: [null, Validators.required],
    });

    this.fetchData();
  }

  fetchData(): void {
    this.reset();

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

        this.binMaterials = Object.keys(data[1]);

        this.addClickListener();

        data[0].forEach((bin: Bin) => {
          const el = document.createElement('img');
          el.className = 'marker';
          el.src = `assets/images/logo.webp`;
          el.style.width = '40px';

          el.onclick = () => {
            this.currentView = 'edit';
            this.selectedBin = bin;
            this.editBinForm.controls['address'].setValue(
              bin.address ? bin.address : ''
            );
            this.editBinForm.controls['selectedMaterial'].setValue(
              bin.material
            );
          };

          new mapboxgl.Marker(el)
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

  handleDelete(): void {
    this.isLoading2 = true;
    this.binsService
      .deleteBin(this.selectedBin.id)
      .pipe(
        finalize(() => {
          this.isLoading2 = false;
        })
      )
      .subscribe(
        (data) => {
          this.fetchData();
        },
        (err: any) => {
          console.log(err.message);
        }
      );
  }

  reset(): void {
    this.currentView = 'view';
    this.selectedLocation = { lat: 0, lng: 0 };
    this.editBinForm.reset();
    this.clickCount = 0;
    if (this.marker) this.marker.remove();
  }

  handleEditForm(): void {
    let body: any = {
      id: this.selectedBin.id,
      address: this.editBinForm.get('address')?.value,
      material: this.editBinForm.get('selectedMaterial')?.value,
    };
    if (this.selectedLocation.lat == 0) {
      body['latitude'] = this.selectedBin.latitude;
      body['longitude'] = this.selectedBin.longitude;
    } else {
      body['latitude'] = this.selectedLocation.lat;
      body['longitude'] = this.selectedLocation.lng;
    }

    this.isLoading2 = true;
    this.binsService.updateBin(body).subscribe(
      (data) => {
        this.isLoading2 = false;
        this.fetchData();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  addClickListener(): void {
    this.map.on('click', (e) => {
      if (this.currentView == 'edit') {
        if (this.clickCount > 0) {
          if (this.marker) this.marker.remove();
          this.selectedLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
          this.addMarker(e.lngLat.lat, e.lngLat.lng, 3);
        }
        this.clickCount++;
      }
    });
  }
}
