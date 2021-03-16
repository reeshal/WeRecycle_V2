import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PickupService {
  constructor(private http: HttpClient) {}

  addPickup(formData: FormData) {
    return this.http.post(`${environment.apiURL}/Routes/New`, formData);
  }
  updatePickup(formData: FormData) {
    return this.http.patch(`${environment.apiURL}/Routes/AddPickup`, formData);
  }
}
