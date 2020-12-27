import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-driver-form',
  templateUrl: './add-driver-form.component.html',
  styleUrls: ['./add-driver-form.component.css']
})
export class AddDriverFormComponent implements OnInit {
  isLoading: boolean = false;
  // addDriverForm!: FormGroup;

  AddDriverForm = new FormGroup({
    phonenumber: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{8}$"), Validators.minLength(8)]),
    address: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private modal: NzModalService,private usersService: UsersService) {}

  @Input() showAddDriverModal: boolean=false;
  @Input() toggleAddDriverModal: Function = ()=>{};

  ngOnInit(): void {

  }

  handleCancel(data:boolean): void {
    this.showAddDriverModal = false;
    this.toggleAddDriverModal(data);
  }

  handleAddUser(){
    if (this.AddDriverForm.valid) {
      const fullName= this.AddDriverForm.value.fullname;
      const address= this.AddDriverForm.value.address;
      const phoneNumber= this.AddDriverForm.value.phonenumber;
      const email= this.AddDriverForm.value.email;

      let jsonBody = {
        fullName,
        address,
        phoneNumber,
        email
      };
      console.log(jsonBody);
      
      this.modal.confirm({
        nzTitle: 'Confirm New Driver?',
        nzContent: 'Are you sure?',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.usersService.addDriver(jsonBody).pipe(finalize(
            ()=>{
              this.handleCancel(true);
            }
          )).subscribe(
            () => {
              this.modal.success({
                nzTitle: 'Success',
                nzContent: 'The new driver has been added to system'
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

  get email(){
    return this.AddDriverForm.get('email') as FormControl;
  }

  get phonenumber(){
    return this.AddDriverForm.get('phonenumber') as FormControl;
  }

  get address(){
    return this.AddDriverForm.get('address') as FormControl;
  }

  get fullname(){
    return this.AddDriverForm.get('fullname') as FormControl;
  }

}
