import { Injectable } from '@angular/core';
import { StorageService } from '../Storage/storage.service';
import { HttpInterceptor,HttpRequest,HttpHandler} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {
  constructor(private storageService: StorageService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storageService.getCookie('token');
    const new_req = req.clone({
      headers: req.headers
        .append('Authorization', `Bearer ${token}`)
        .append('Content-Type', 'application/json'),
    });
    return next.handle(new_req);
  }
}
