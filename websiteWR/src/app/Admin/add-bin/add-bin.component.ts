import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bin } from '../Models/Bin.model';
import { BinService } from '../Services/Bin/bin.service';

@Component({
  selector: 'app-add-bin',
  templateUrl: './add-bin.component.html',
  styleUrls: ['./add-bin.component.css'],
})
export class AddBinComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private binService: BinService,
    private modal: NzModalService,
    private router: Router
  ) {}

  addBinForm!: FormGroup;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -20.2349416;
  lng = 57.49629944;
  imageUrl: string = '';
  isLoading: boolean = true;
  isLoading2: boolean = false;
  bins: Bin[] = [];
  selectedLocation = {
    lat: 0,
    lng: 0,
  };
  marker: any;

  ngOnInit(): void {
    this.addBinForm = this.fb.group({
      material: [null, [Validators.required]],
      description: [null],
    });

    this.binService
      .getAllBins()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: Bin[]) => {
          this.bins = data;

          this.map = new mapboxgl.Map({
            accessToken: environment.mapbox.accessToken,
            container: 'map',
            style: this.style,
            zoom: 10,
            center: [this.lng, this.lat],
          });

          this.map.on('click', (e) => {
            if (!this.selectedLocation.lat && !this.selectedLocation.lng) {
              this.selectedLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
              this.addMarker(e.lngLat.lat, e.lngLat.lng, 3);
            }
          });

          this.bins.forEach((station: Bin) => {
            this.addMarker(station.lat, station.lng, station.full ? 1 : 0);
          });
        },
        (err) => {
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

  submitForm(): void {
    for (const i in this.addBinForm.controls) {
      this.addBinForm.controls[i].markAsDirty();
      this.addBinForm.controls[i].updateValueAndValidity();
    }

    if (this.addBinForm.valid) {
      this.isLoading2 = true;
      this.binService
        .addBin(
          this.selectedLocation.lat,
          this.selectedLocation.lng,
          this.imageUrl,
          this.addBinForm.get('material')?.value,
          this.addBinForm.get('description')?.value
        )
        .pipe(
          finalize(() => {
            this.isLoading2 = false;
          })
        )
        .subscribe(
          (data: any) => {
            this.modal.success({
              nzTitle: 'Success',
              nzContent: 'Bin created successfully. ',
              nzOnOk: this.goToAllBins,
            });
          },
          (err) => {
            console.log(err.message);
          }
        );
    }
  }
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        this.imageUrl = reader.result.toString();
      }
    };
  }

  handleCancel() {
    this.addBinForm.reset();
    this.imageUrl = '';
    this.selectedLocation = {
      lat: 0,
      lng: 0,
    };
    this.marker.remove();
  }

  goToAllBins = () => {
    this.router.navigate(['Bins']);
  };
}
