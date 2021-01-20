import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phone: [
        '51234567',
        [Validators.required, Validators.pattern('^[0-9]{8}$')],
      ],
      password: ['12345', [Validators.required]],
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
            // console.log(data);
            this.storageService.createCookie('id', data.id.toString(), 1);
            this.storageService.createCookie(
              'fullName',
              data.firstName + '' + data.lastName,
              1
            );
            this.storageService.createCookie('token', data.token, 1);
            this.storageService.createCookie('role', data.role, 1);
            this.storageService.createCookie('role', data.role, 1);

            window.location.href = '/View-Allocations';
          },
          (err: any) => {
            console.log(err.message);
            this.hasError = true;
          }
        );
    }
  }
}
