import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BinService {
  constructor(private http: HttpClient) {}

  getAllBins(): Observable<any> {
    return this.http.get(`${environment.apiURL}/bins`);
  }

  getBinId(phoneno:string){
    return this.http.get(`${environment.apiURL}/Bins/binId?phonenumber=${phoneno}`);
  }

  getReportedBins(status:any): Observable<any> {
    return this.http.get(`${environment.apiURL}/reports?status=${status}`);
  }
  getFullUnallocatedBins(): Observable<any> {
    return this.http.get(`${environment.apiURL}/reports/unallocatedbins`);
  }

  changeReportStatus(status: string, report_id: number) {
    return this.http.post(
      `${environment.apiURL}/reports/manage?status=${status}&report_id=${report_id}`,
      {}
    );
  }
  getUnallocatedReportedBins(): Observable<any> {
    return this.http.get('data/unallocated_bins.json');
  }
  addBin(
    lat: number,
    lng: number,
    image: string,
    material: string,
    description: string
  ) {
    console.log({
      lat,
      lng,
      image,
      material,
      description,
    });
    return this.http.post(`${environment.apiURL}/bins`, {
      lat,
      lng,
      image,
      material,
      description,
    });
  }
}
