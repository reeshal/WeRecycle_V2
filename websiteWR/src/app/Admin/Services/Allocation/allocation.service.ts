import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AllocationService {
  constructor(private http: HttpClient) {}

  getDriverAllocations(): Observable<any> {
    return this.http.get(`${environment.apiURL}/pickups/allocations`);
  }
  getGarageLocation(): Observable<any> {
    // TODO: change url
    return this.http.get(`assets/data/garage.json`);
  }
  changeGarageLocation(location: {
    lat: number;
    lng: number;
  }): Observable<any> {
    // TODO: change url
    console.log(location);
    return this.http.get(`assets/data/garage.json`);
  }
  changePickupStatus(pickup_id: number, status: string): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/pickup/manage?pickup_id=${pickup_id}&status=${status}`,
      {}
    );
  }

  allocateDriver(
    driverPhoneNumber: string,
    binsID: number[],
    date: string
  ): Observable<any> {
    return this.http.post(`${environment.apiURL}/pickups`, {
      driverPhoneNumber,
      binsID,
      date,
    });
  }
}
