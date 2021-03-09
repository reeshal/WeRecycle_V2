import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Bin } from '../Models/Bin.model';
import { BinService } from '../Services/Bin/bin.service';

@Component({
  selector: 'app-manage-bins',
  templateUrl: './manage-bins.component.html',
  styleUrls: ['./manage-bins.component.css'],
})
export class ManageBinsComponent implements OnInit {
  constructor(private binsService: BinService, private fb: FormBuilder) {}

  map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/streets-v11';
  style = 'mapbox://styles/mapbox/light-v10';
  lat = -20.3476;
  lng = 57.3652;
  currentView = 'add';
  addBinForm!: FormGroup;

  marker: any;
  selectedLocation = {
    lat: 0,
    lng: 0,
  };

  isLoading2: boolean = false;

  ngOnInit() {
    this.addBinForm = this.fb.group({
      material: [null, [Validators.required]],
      address: [null],
    });

    this.binsService.getAllBins().subscribe(
      (data: Array<Bin>) => {
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
      const data = {
        address: this.addBinForm.get('address')?.value,
        latitude: this.selectedLocation.lat,
        longitude: this.selectedLocation.lng,
        material: this.addBinForm.get('material')?.value,
      };
      console.log(data);
    }
  }

  handleCancel() {
    if (this.marker) this.marker.remove();
    this.currentView = 'view';
    this.addBinForm.reset();
    this.selectedLocation = { lat: 0, lng: 0 };
  }
}
