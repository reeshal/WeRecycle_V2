import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { PickupService } from '../Services/Pickup/pickup.service';

@Component({
  selector: 'app-add-pickup',
  templateUrl: './add-pickup.component.html',
  styleUrls: ['./add-pickup.component.css'],
})
export class AddPickupComponent implements OnInit {
  constructor(
    private pickupService: PickupService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) {}

  pickupForm!: FormGroup;
  current = 0;
  date = new Date();
  selectedBeforeFile?: File;
  selectedAfterFile?: File;
  beforeImageUrl: any;
  afterImageUrl: any;
  weight: number = 0;
  isLoading: boolean = false;
  isValid: boolean = false;
  routeId: number;

  currentPickup: number = 1;

  ngOnInit(): void {
    this.pickupForm = this.fb.group({
      numberOfPickups: ['1', [Validators.required, Validators.min(1)]],
    });
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    const form = new FormData();
    form.append('BeforeImage', this.selectedBeforeFile!);
    form.append('AfterImage', this.selectedAfterFile!);
    form.append('Weight', this.weight.toString());
    form.append('Date', this.date.toISOString());

    const noOfPickups: number = +this.pickupForm.get('numberOfPickups')?.value;

    this.isLoading = true;
    console.log(this.pickupForm);

    if (this.currentPickup == 1 || noOfPickups == 1) {
      this.pickupService
        .addPickup(form)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (data: any) => {
            if (this.currentPickup == noOfPickups) {
              this.modal.success({
                nzTitle: 'Success',
                nzContent: 'Your pickup has been recorded. ',
              });
              this.pickupForm.reset();
              this.isValid = false;
              this.reset();
            } else {
              this.currentPickup++;
              this.reset();
              this.routeId = data['id'];
              this.date = new Date(data['date']);
            }
          },
          (err: any) => {
            console.log(err.message);
          }
        );
    } else if (this.currentPickup <= noOfPickups) {
      form.append('RouteId', this.routeId.toString());
      this.pickupService
        .updatePickup(form)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (data: any) => {
            if (this.currentPickup == noOfPickups) {
              this.modal.success({
                nzTitle: 'Success',
                nzContent: 'Your pickup has been recorded. ',
              });
              this.pickupForm.reset();
              this.isValid = false;
            }
            this.reset();
          },
          (err: any) => {
            console.log(err.message);
          }
        );
    }
  }

  onChange(result: Date): void {
    this.date = result;
  }

  onBeforeFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedBeforeFile = file;

      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          // convert image file to base64 string
          this.beforeImageUrl = reader.result;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  onAfterFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedAfterFile = file;

      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          // convert image file to base64 string
          this.afterImageUrl = reader.result;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  submitForm(): void {
    for (const i in this.pickupForm.controls) {
      this.pickupForm.controls[i].markAsDirty();
      this.pickupForm.controls[i].updateValueAndValidity();
    }
    if (this.pickupForm.valid) {
      this.isValid = true;
    }
  }

  reset() {
    this.current = 0;
    this.date = new Date();
    this.weight = 0;
    this.selectedBeforeFile = undefined;
    this.selectedAfterFile = undefined;
    this.beforeImageUrl = '';
    this.afterImageUrl = '';
    this.routeId = -1;
  }
}
