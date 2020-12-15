import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  //it is filtered later by driver or reguser
  getRegUsers(): Observable<any> {
    return this.http.get(`${environment.apiURL}/Users`);
  }

  addDriver(driver:any) {
    const body = driver;
    return this.http.post(
      `${environment.apiURL}/Register/Driver`,
      JSON.stringify(body)
    );
  }

  addRegUser(user:any) {
    const body = user;
    return this.http.post(
      `${environment.apiURL}/Register/Business`,
      JSON.stringify(body)
    );
  }

  changeStatusUser(pnumber: string, status: string) {
    return this.http.post(
      `${environment.apiURL}/Users/Manage?phoneNumber=${pnumber}&status=${status}`,
      JSON.stringify('')
    );
  }

  deleteUserBin(binId:number){
    return this.http.delete(`${environment.apiURL}/Bins?BinId=${binId}`);
  }
  
}
