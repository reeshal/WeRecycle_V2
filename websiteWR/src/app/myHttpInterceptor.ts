import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MyHttpInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQW50b2luZSBLaW5nIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiI1MjUxMDIyOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOIiwiU3RhdHVzIjoiQVBQUk9WRUQiLCJleHAiOjE2MTc5MTA4NjcsImlzcyI6IndlcmVjeWNsZSIsImF1ZCI6IndlcmVjeWNsZSJ9.KgIBPwZVl1KocH69hl6nKbhg4-Gn4q4MtSG93cZ2OnA';
    const new_req = req.clone({
      headers: req.headers
        .append('Authorization', `Bearer ${token}`)
        .append('Content-Type', 'application/json'),
    });
    return next.handle(new_req);
  }
}
