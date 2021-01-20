import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Shared/services/Storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  login(phone: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:51433/api/auth/login`, {
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

  logout(): void {
    this.storageService.deleteAllCookies();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    const id = this.storageService.getCookie('id');
    const firstName = this.storageService.getCookie('firstName');
    const lastName = this.storageService.getCookie('lastName');
    const role = this.storageService.getCookie('role');
    const token = this.storageService.getCookie('token');

    return (
      id.length > 0 &&
      role.length > 0 &&
      token.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0
    );
  }
}
