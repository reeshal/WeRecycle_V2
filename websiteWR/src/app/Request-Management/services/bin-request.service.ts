import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BinRequestService {

  constructor(private http: HttpClient) {}

  getRequests(): Observable<any> {
    return this.http.get(`${environment.apiURL}/BinRequests`);
  }

  // addRequest(request){
  //   const body = request;
  //   return this.http.post(
  //     `${environment.apiURL}/BinRequests`,
  //     JSON.stringify(body)
  //   );
  // }

  updateStatus(requestId:number, status:string){
    return this.http.post(
      `${environment.apiURL}/BinRequests?requestID=${requestId}&status=${status}`,
      JSON.stringify("")
    );
  }
}
