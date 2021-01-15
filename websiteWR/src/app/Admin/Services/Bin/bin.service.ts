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
}
