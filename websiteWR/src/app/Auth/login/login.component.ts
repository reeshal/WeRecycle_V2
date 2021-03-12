import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StorageService } from 'src/app/Shared/services/Storage/storage.service';
import { AuthRes } from '../Models/AuthRes.model';
import { AuthService } from '../Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phone: [
        '51111111',
        [Validators.required, Validators.pattern('^[0-9]{8}$')],
      ],
      password: ['1234', [Validators.required]],
    });
  }

  submitForm(): void {
    this.hasError = false;
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService
        .login(
          this.loginForm.get('phone')!.value,
          this.loginForm.get('password')!.value
        )
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (data: AuthRes) => {
            console.log(data);
            this.storageService.createCookie('id', data.id.toString(), 1);
            this.storageService.createCookie('token', data.token, 1);
            this.storageService.createCookie('role', data.role, 1);
            this.storageService.createCookie('status',data.status,1);
            // this.storageService.createCookie('fullname', data.fullname, 1);
            
            // window.location.href = '/User-Management/Registered-Users';
            this.router.navigate(['/Admin/Manage-Drivers']);
          },
          (err: any) => {
            console.log(err.message);
            this.hasError = true;
          }
        );
    }
  }
}
