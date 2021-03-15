import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http: HttpClient) {}

  getDriverDetails():Observable<any> {
    return this.http.get(`${environment.apiURL2}/Account/Driver`);
  }

  updatePassword(jsonBody:any):Observable<any>{
    return this.http.patch(`${environment.apiURL2}/Account/UpdatePassword`, jsonBody);
  }
  
}
