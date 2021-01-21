import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PickupRequestsService {

  constructor(private http: HttpClient) {}

  getBinId(phoneno:string){
    return this.http.get(`${environment.apiURL}/Bins/binId?phonenumber=${phoneno}`);
  }

  getRequests(): Observable<any> {
    return this.http.get(`${environment.apiURL}/PickupRequests`);
  }

  addRequest(request:any){
    const body=request;
    return this.http.post(
      `${environment.apiURL}/PickupRequests`,
      JSON.stringify(body)
    );
  }

}
