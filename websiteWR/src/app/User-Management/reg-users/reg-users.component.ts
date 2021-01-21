import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { NzButtonSize } from 'ng-zorro-antd/button';
import {Reg_Users} from '../Models/reg_users';

@Component({
  selector: 'app-reg-users',
  templateUrl: './reg-users.component.html',
  styleUrls: ['./reg-users.component.css']
})
export class RegUsersComponent implements OnInit {
  isLoading: boolean = true;
  search: string = "";
  size: NzButtonSize = 'default';
  selectedStatus:any;
  showClearButton = false;
  showDetailsModal: boolean = false;

  rows:Array<Reg_Users> = [];
  filteredRows:Array<Reg_Users> = [];
  moreDetailedUser: any;

  constructor(private modal: NzModalService,private usersService: UsersService) { }

  ngOnInit(): void {
    this.fetchRegUsers();
  }

  fetchRegUsers(): void {
    this.usersService.getRegUsers().pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    )
    .subscribe(   
      (data: Array<Reg_Users>) => {
        this.rows=data.filter(d=>d.type=="registered");
        this.filteredRows=this.rows;
        console.log(this.filteredRows);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  applySearch(event:any) {
    const val = event.target.value.toLowerCase();
    this.showClearButton = true;
    // filter our data
    const temp = this.rows.filter((d:any)=> {
      return (d.fullname.toLowerCase().indexOf(val) !== -1 || !val)
      ||(d.phoneno.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.filteredRows = temp;
  }

  handleStatusChange(): void{
    console.log(this.selectedStatus);
    this.showClearButton = true;
    this.selectedStatus== 'All' ? this.filteredRows = this.rows :
      this.filteredRows = this.rows.filter((b:any) => b.status === this.selectedStatus);
  }

  clearFilter():void{
    this.showClearButton=false;
    this.filteredRows=this.rows;
    this.selectedStatus="";
    this.search="";
  }

  viewMoreDetails(phoneno: string):void{
    this.moreDetailedUser = this.rows.filter((b)=> b.phoneno == phoneno)[0];
    this.toggleMoreDetailsModal(false);
  }

  public toggleMoreDetailsModal = (fetchData: boolean): void => {
    this.showDetailsModal = !this.showDetailsModal;
    if (fetchData) this.fetchRegUsers();
  };

  handleApproval(phoneno: string): void {
    this.modal.confirm({
      nzTitle: 'Approve User?',
      nzContent: 'Are you sure?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.usersService.changeStatusUser(phoneno,"approved").pipe(finalize(
          ()=>{
            this.fetchRegUsers();
          }
        )).subscribe(
          () => {
            this.modal.success({
              nzTitle: 'Success',
              nzContent: 'User has been approved'
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
