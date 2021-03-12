import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getDrivers(): Observable<any> {
    return this.http.get(`${environment.apiURL}/Account/Drivers`);
  }

  updateStatus(driverId: number, status: string) {
    return this.http.patch(
      `${environment.apiURL}/Account/UpdateStatus?driverId=${driverId}&newStatus=${status}`,
      JSON.stringify('')
    );
  }

  // to change url
  updatePassword(jsonBody: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/Account/Driver`, jsonBody);
  }

  // to change url
  getAdminDetail(): Observable<any> {
    return this.http.get(`${environment.apiURL}/Account/Drivers`);
  }
}
