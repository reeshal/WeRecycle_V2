import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
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

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phone: [
        '57263859',
        [Validators.required, Validators.pattern('^[0-9]{8}$')],
      ],
      password: ['admin', [Validators.required]],
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
          },
          (err: any) => {
            console.log(err.message);
            this.hasError = true;
          }
        );
    }
  }
}
