import { Component, OnInit, Input} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DriverService } from '../../Services/Driver/driver.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  
  changePasswordForm= new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  @Input() showPasswordModal: boolean=false;
  @Input() togglePasswordModal: Function = ()=>{};

  constructor(private modal: NzModalService, private driverService: DriverService) { }

  ngOnInit(): void {
  }

  handleCancel(data:boolean): void {
    this.showPasswordModal = false;
    this.togglePasswordModal(data);
  }

  handleChangePassword(){
    if(this.changePasswordForm.valid){
      let jsonBody ={
        oldPassword: this.changePasswordForm.get('oldPassword')!.value,
        newPassword: this.changePasswordForm.get('newPassword')!.value,
      };
      console.log(jsonBody);

      this.modal.confirm({
        nzTitle: 'Change Password?',
        nzContent: 'Are you sure?',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.driverService.updatePassword(jsonBody).pipe(finalize(
            ()=>{
              this.handleCancel(true);
            }
          )).subscribe(
            () => {
              this.modal.success({
                nzTitle: 'Success',
                nzContent: 'Your password has been changed successfully'
              });
            },
            (err) => {
              this.modal.error({
                nzTitle: 'Error',
                nzContent: 'Your request failed due to connectivity issues'
              });
            }
          );
        },
        nzCancelText: 'No',
        nzOnCancel: () => {}
      });
    }
  }

}
