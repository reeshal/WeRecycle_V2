import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getDrivers():Observable<any> {
    return this.http.get(`${environment.apiURL2}/Account/Drivers`);
  }

  updateStatus(driverId:number, status:string){
    return this.http.patch(
      `${environment.apiURL2}/Account/UpdateStatus?driverId=${driverId}&newStatus=${status}`,
      JSON.stringify('')
    );
  }
}
