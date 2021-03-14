import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/Services/auth/auth.service';
import { StorageService } from '../services/Storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  role: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isAuthenticated();
        this.role = this.storageService.getCookie('role');
        console.log(this.role);
      }
    });
  }

  ngOnInit(): void {
    // this.fullname = this.storageService.getCookie('fullname');
  }

  logout(): void {
    this.authService.logout();
  }
}
