import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
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
          this.registerForm.get('firstName')!.value,
          this.registerForm.get('lastName')!.value,
          this.registerForm.get('phoneNumber')!.value,
          this.registerForm.get('password')!.value
        )
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          () => {
            this.registerForm.reset();
            this.modal.success({
              nzTitle: 'Success',
              nzContent: 'Your registration has been sent for approval. ',
            });
          },
          (err: any) => {
            console.log(err.message);
            this.hasError = true;
          }
        );
    }
  }

  changePage(){
    this.router.navigateByUrl('/Login');
  }
}
