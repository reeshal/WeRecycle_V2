import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BinRequestsService } from '../Services/bin-requests.service'
import * as mapboxgl from 'mapbox-gl';
// import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-bin-requests',
  templateUrl: './bin-requests.component.html',
  styleUrls: ['./bin-requests.component.css']
})
export class BinRequestsComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  // selectedLocation: any;
  selectedLocation = {
    lat: 0,
    lng: 0,
  };
  lat = -20.2349416;
  lng = 57.49629944;
  marker:any;

  BinRequestForm= new FormGroup({
    material: new FormControl('', [Validators.required]),
    count: new FormControl('', [Validators.required]),
  });

  constructor(private modal: NzModalService,private binrequestService: BinRequestsService) { }

  ngOnInit(): void {
    this.initialiseMap();
  }

  initialiseMap(): void {
    // mapboxgl.accessToken = environment.mapbox.accessToken;
    // Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    // this.map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: environment.mapbox.accessToken,
    //     countries: 'mu',
    //     mapboxgl: mapboxgl,
    //   })
    // );

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    this.map.on('click', (e) => {
      if (!this.selectedLocation.lat && !this.selectedLocation.lng) {
        this.selectedLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
        this.addMarker(e.lngLat.lat, e.lngLat.lng);
      }
      else{
        this.marker.remove();
        this.selectedLocation = { lat: e.lngLat.lat, lng: e.lngLat.lng };
        this.addMarker(e.lngLat.lat, e.lngLat.lng);
      }
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  addMarker(lat:any, lng:any) {
    const el = document.createElement('img');
    el.className = 'marker';
    el.src = "assets/images/bin-3.png";
    el.style.width = '25px';

    this.marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(this.map);
  }

  get count(){
    return this.BinRequestForm.get('count') as FormControl;
  }

  get material(){
    return this.BinRequestForm.get('count') as FormControl;
  }

  changeMaterial(e:any){
    this.material.setValue(e.target.value, {onlySelf: true})
  }

  requestBin(){
    if(this.BinRequestForm.valid && this.selectedLocation.lat!=0){
      // const phoneno=this.storageService.getCookie('phoneno');

      const material= this.BinRequestForm.value.material;
      const count= this.BinRequestForm.value.count;
      const phoneno= 51234569;

      let jsonBody = {
        userPhoneNumber: phoneno,
        material,
        count,
        lat:this.selectedLocation.lat,
        lng:this.selectedLocation.lng
      };
      console.log(jsonBody);

      this.modal.confirm({
        nzTitle: 'Request New bin?',
        nzContent: 'Are you sure?',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.binrequestService.addRequest(jsonBody).pipe(finalize(
            ()=>{
              this.BinRequestForm.reset();
            }
          )).subscribe(
            () => {
              this.modal.success({
                nzTitle: 'Success',
                nzContent: 'Your bin request has been sent for approval'
              });
            },
            (err) => {
              this.modal.error({
                nzTitle: 'Error',
                nzContent: 'Your request failed due to connectivity issues'
              });
            }
          );
        },
        nzCancelText: 'No',
        nzOnCancel: () => {}
      });
      
    }
      
  }

}
