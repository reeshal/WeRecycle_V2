import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BinRequestsService {

  constructor(private http: HttpClient) { }

  addRequest(request:any){
    const body = request;
    return this.http.post(
      `${environment.apiURL}/BinRequests`,
      JSON.stringify(body)
    );
  }
  
}
