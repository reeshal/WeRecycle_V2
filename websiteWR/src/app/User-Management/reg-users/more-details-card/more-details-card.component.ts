import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-more-details-card',
  templateUrl: './more-details-card.component.html',
  styleUrls: ['./more-details-card.component.css']
})
export class MoreDetailsCardComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private modal: NzModalService,private usersService: UsersService) {}

  @Input() showDetailsModal: boolean=false;
  @Input() toggleMoreDetailsModal: Function = ()=>{};
  @Input() moreDetailsUser: any;

  ngOnInit(): void {
  }

  handleStatusChange(phoneno: string, status: string):void{
    this.modal.confirm({
      nzTitle: 'Change Status of User?',
      nzContent: 'Are you sure?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.usersService.changeStatusUser(phoneno,status).pipe(finalize(
          ()=>{
          
            this.handleCancel(true);
          }
        )).subscribe(
          () => {
            this.modal.success({
              nzTitle: 'Success',
              nzContent: 'User status has been changed'
            });
            this.handleCancel(true);
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

  handleCancel(data:boolean): void {
    this.showDetailsModal = false;
    this.toggleMoreDetailsModal(data);
  }

  handleDeleteBin(binId: number){
    this.modal.confirm({
      nzTitle: 'Are you sure to delete this bin?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.usersService.deleteUserBin(binId).pipe(finalize(
          ()=>{
            this.handleCancel(true);
          }
        )).subscribe(
          () => {
            this.modal.success({
              nzTitle: 'Success',
              nzContent: 'Bin was deleted successfully'
            });
            this.handleCancel(true);
          },
          (err)=>{
            this.modal.error({
              nzTitle: 'Error',
              nzContent: 'Your delete request failed due to connectivity issues'
            });
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }

}
