import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UserService } from '../Services/Users/user.service';
import { Admin } from '../Models/Admin.model';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  isLoading: boolean = true;
  adminObject: Admin;
  changePasswordForm= new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  constructor(private modal: NzModalService, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAdminDetail();
  }

  fetchAdminDetail(){
    this.userService.getAdminDetail().pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    )
    .subscribe(   
      (data: Admin) => {
        this.adminObject=data;
        console.log(this.adminObject)
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  handleChangePassword(){
    if(this.changePasswordForm.valid){
      let jsonBody ={
        currentPassword: this.changePasswordForm.get('oldPassword')!.value,
        newPassword: this.changePasswordForm.get('newPassword')!.value,
      };
      console.log(jsonBody);

      this.modal.confirm({
        nzTitle: 'Change Password?',
        nzContent: 'Are you sure?',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.userService.updatePassword(jsonBody).pipe(
            
            finalize(
            ()=>{
              this.fetchAdminDetail();
            }
          )).subscribe(
            (response) => {
              response 
              ?
              this.modal.success({
                nzTitle: 'Success',
                nzContent: 'Your password has been changed successfully'
              })
              :
              this.modal.error({
                nzTitle: 'Error',
                nzContent: 'Your current password was wrong.'
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
