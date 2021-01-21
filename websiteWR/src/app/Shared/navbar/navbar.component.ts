import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/Services/auth/auth.service';
import { StorageService } from '../services/Storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  fullname: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.fullname = this.storageService.getCookie('fullname');
  }

  logout(): void {
    this.authService.logout();
  }
}
