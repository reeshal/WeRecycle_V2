import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { DriverService } from '../Services/Driver/driver.service';

@Component({
  selector: 'app-add-pickup',
  templateUrl: './add-pickup.component.html',
  styleUrls: ['./add-pickup.component.css'],
})
export class AddPickupComponent implements OnInit {
  constructor(
    private driverService: DriverService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {}
  current = 0;
  date = new Date();
  selectedBeforeFile?: File;
  selectedAfterFile?: File;
  beforeImageUrl: any;
  afterImageUrl: any;
  weight: number = 0;
  isLoading: boolean = false;

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

    console.log(this.selectedAfterFile?.name);
    console.log(this.selectedBeforeFile?.name);
    this.isLoading = true;

    this.driverService
      .addPickup(form)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        () => {
          this.modal.success({
            nzTitle: 'Success',
            nzContent: 'Your pickup has been recorded. ',
          });
        },
        (err: any) => {
          console.log(err.message);
        }
      );
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
}
