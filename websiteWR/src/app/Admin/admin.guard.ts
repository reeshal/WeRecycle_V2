import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../Auth/Services/auth/auth.service';
import { StorageService } from '../Shared/services/Storage/storage.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const next_path = next.url[0].path;
    if (this.authService.isAuthenticated()) {
      const role = this.storageService.getCookie('role');

      if (role == 'ADMIN') {
        if (
          next_path == 'Edit-Bins' ||
          next_path == 'View-Pickups' ||
          next_path == 'Add-Bins' ||
          next_path == 'Manage-Drivers' ||
          next_path == 'My-Profile'
        ) {
          return true;
        }
      }

      return false;
    } else {
      localStorage.setItem('path', next_path);
      this.router.navigate(['/']);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
    // window.location.href = '/';
  }
}
