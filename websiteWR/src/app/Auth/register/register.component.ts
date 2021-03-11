import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  selectedIdFile?: File;
  selectedLicenseFile?: File;
  selectedAddressFile?: File;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modal: NzModalService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      idcardFile: [null, [Validators.required]],
      licenseFile: [null, [Validators.required]],
      addressFile: [null, [Validators.required]],
    });
  }

  onLicenseFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedLicenseFile=file;
    }
  }

  onAddressFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedAddressFile=file;
    }
  }

  onIdFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedIdFile=file;
    }
  }


  submitForm(): void {
    this.hasError = false;
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }
  
    if (this.registerForm.valid) {
      const form = new FormData();
      form.append("PhoneNumber",this.registerForm.get('phoneNumber')!.value)
      form.append("FirstName",this.registerForm.get('firstName')!.value);
      form.append("LastName",this.registerForm.get('lastName')!.value);
      form.append("Password",this.registerForm.get('password')!.value);
      form.append("IdCard",this.selectedIdFile!);
      form.append("DrivingLicense",this.selectedLicenseFile!);
      form.append("ProofOfAddress",this.selectedAddressFile!);

      this.isLoading = true;

      this.authService
        .register(form)
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
