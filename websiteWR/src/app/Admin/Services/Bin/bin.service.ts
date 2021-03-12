import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BinService {
  constructor(private http: HttpClient) {}

  getAllBins(): Observable<any> {
    return this.http.get(`${environment.apiURL}/Bins/Get`);
  }

  addBin(
    latitude: number,
    longitude: number,
    material: string,
    address: string
  ) {
    return this.http.post(`${environment.apiURL}/Bins/New`, {
      latitude,
      longitude,
      material,
      address,
    });
  }
}
