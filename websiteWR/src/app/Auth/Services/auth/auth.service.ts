import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(phone: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiURL}/login`, {
      phoneNumber: phone,
      password,
    });
  }

  register(
    fullName: string,
    phoneNumber: string,
    title: string,
    password: string,
    brn: number,
    email: string,
    address: string
  ) {
    return this.http.post(`${environment.apiURL}/register/business`, {
      fullName,
      phoneNumber,
      title,
      password,
      brn,
      email,
      address,
    });
  }

  // logout(): void {
  //   this.storageService.deleteAllCookies();
  //   this.router.navigate(['/']);
  // }
}
