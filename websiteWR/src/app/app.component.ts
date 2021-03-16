import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './Auth/Services/auth/auth.service';
import { StorageService } from './Shared/services/Storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'We Recycle';

  constructor(
    private router: Router,
    authService: AuthService,
    storageService: StorageService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const isLoggedIn = authService.isAuthenticated();
        if (isLoggedIn && val.url === '/') {
          const role = storageService.getCookie('role');

          if (role == 'ADMIN') {
            this.router.navigate(['/Admin/Manage-Bins']);
          } else {
            this.router.navigate(['/Driver/Add-Pickup']);
          }
        }
      }
    });
  }
}
