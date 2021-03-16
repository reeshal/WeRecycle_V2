import { Injectable } from '@angular/core';
import { StorageService } from '../Storage/storage.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private storageService: StorageService) {}
  urlToNotUse: string = `${environment.apiURL}/Account/RegisterDriver`;
  urlToNotUse2: string = `${environment.apiURL}/Routes/New`;
  urlToNotUse3: string = `${environment.apiURL}/Routes/AddPickup`;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log(req.url);
    if (req.url == this.urlToNotUse) {
      return next.handle(req);
    }
    if (req.url == this.urlToNotUse2 || req.url == this.urlToNotUse3) {
      const token = this.storageService.getCookie('token');
      const new_req = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
      });
      return next.handle(new_req);
    }
    const token = this.storageService.getCookie('token');
    const new_req = req.clone({
      headers: req.headers
        .append('Authorization', `Bearer ${token}`)
        .append('Content-Type', 'application/json'),
    });
    return next.handle(new_req);
  }
}

// https://stackoverflow.com/questions/55522320/angular-interceptor-exclude-specific-urls/55522787
