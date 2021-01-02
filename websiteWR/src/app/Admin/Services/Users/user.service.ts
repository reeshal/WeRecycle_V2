import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //it is filtered later by driver or reguser
  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiURL}/Users`);
  }
}
