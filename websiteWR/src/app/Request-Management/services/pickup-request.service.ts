import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PickupRequestService {

  constructor(private http: HttpClient) {}

  getRequests(): Observable<any> {
    return this.http.get(`${environment.apiURL}/PickupRequests`);
  }

  // addRequest(request){
  //   const body=request;
  //   return this.http.post(
  //     `${environment.apiURL}/PickupRequests`,
  //     JSON.stringify(body)
  //   );
  // }

  updateRequest(request:any){
    const body=request;
    return this.http.patch(
      `${environment.apiURL}/PickupRequests`,
      JSON.stringify(body)
    );
  }
}
