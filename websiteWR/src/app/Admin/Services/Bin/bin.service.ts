import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BinService {
  constructor(private http: HttpClient) {}

  getFullUnallocatedBins(): Observable<any> {
    return this.http.get(`${environment.apiURL}/reports/unallocatedbins`);
  }
  getAllBins(): Observable<any> {
    return this.http.get(`${environment.apiURL}/bins`);
  }

  addBin(
    lat: number,
    lng: number,
    image: string,
    material: string,
    description: string
  ) {
    return this.http.post(`${environment.apiURL}/bins`, {
      lat,
      lng,
      image,
      material,
      description,
    });
  }
}
