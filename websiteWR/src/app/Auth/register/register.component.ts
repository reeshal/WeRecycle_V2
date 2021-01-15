import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../Services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  hasError: boolean = false;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: [null, [Validators.required]],
      title: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      address: [null, [Validators.required]],
      brn: [
        null,
        [Validators.required, Validators.pattern('^[0-9A-Za-z]{14}$')],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm(): void {
    this.hasError = false;
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    if (this.registerForm.valid) {
      this.isLoading = true;

      this.authService
        .register(
          this.registerForm.get('fullName')!.value,
          this.registerForm.get('phone')!.value,
          this.registerForm.get('title')!.value,
          this.registerForm.get('password')!.value,
          this.registerForm.get('brn')!.value,
          this.registerForm.get('email')!.value,
          this.registerForm.get('address')!.value
        )
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (data: any) => {
            console.log(data);
            // this.registerForm.reset();
          },
          (err: any) => {
            console.log(err.message);
            this.hasError = true;
          }
        );
    }
  }

  titleChange(value: string): void {
    this.registerForm.get('title')!.setValue(value);
  }
}
