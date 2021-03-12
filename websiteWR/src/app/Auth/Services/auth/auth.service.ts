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
    return this.http.post(`${environment.apiURL2}/Account/Login`, {
      phoneNumber: phone,
      password,
    });
  }

  register(formData: FormData){
    return this.http.post(`${environment.apiURL2}/Account/RegisterDriver`,formData);
  }

  logout(): void {
    this.storageService.deleteAllCookies();
    window.location.href = 'Login';
    // this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const id = this.storageService.getCookie('id');
    // const fullName = this.storageService.getCookie('fullName');
    const role = this.storageService.getCookie('role');
    const token = this.storageService.getCookie('token');

    return token.length > 0;
  }
}
