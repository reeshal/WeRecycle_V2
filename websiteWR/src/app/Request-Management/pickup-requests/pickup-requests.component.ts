import { Component, OnInit } from '@angular/core';
import { PickupRequestService } from '../services/pickup-request.service';
import { finalize } from 'rxjs/operators';
import { allPickupRequestsLog } from '../Models/all_pickup_requests';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-pickup-requests',
  templateUrl: './pickup-requests.component.html',
  styleUrls: ['./pickup-requests.component.css']
})
export class PickupRequestsComponent implements OnInit {
  isLoading: boolean = true;
  search: string = "";
  showClearButton = false;
  date = null;

  rows:Array<allPickupRequestsLog> = [];
  filteredRows:Array<allPickupRequestsLog> = [];

  constructor(private modal: NzModalService,private pickuprequestService: PickupRequestService) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(){
    this.pickuprequestService.getRequests().pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    )
    .subscribe(   
      (data: Array<allPickupRequestsLog>) => {
        
        this.rows=data;
        this.filteredRows=this.rows;
        console.log(this.filteredRows);

        this.rows.forEach((value)=>{
          value.original_date_requested= new Date(value.date_applied);
          console.log(value.original_date_requested);
          value.temptime = value.date_requested;
          value.date_requested=value.date_requested.slice(8,10)+'/'+value.date_requested.slice(5,7)+'/'+value.date_requested.slice(0,4)+' at '+value.date_requested.slice(11,16);
          value.date_applied=value.date_applied.slice(8,10)+'/'+value.date_applied.slice(5,7)+'/'+value.date_applied.slice(0,4)+' at '+value.date_applied.slice(11,16);
        });
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
      ||(d.material.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.filteredRows = temp;
  }

  clearFilter():void{
    this.showClearButton=false;
    this.filteredRows=this.rows;
    this.search="";
  }

  handleStatusChange(bin_id: number,date: string){
    this.modal.confirm({
      nzTitle: 'Approve Pickup Request?',
      nzContent: 'Are you sure?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => {

        let jsonBody={
          date_requested: date,
          binId:bin_id
        }

        this.pickuprequestService.updateRequest(jsonBody).pipe(finalize(
          ()=>{
            this.isLoading=true;
            this.fetchRequests();
          }
        )).subscribe(
          () => {
            this.modal.success({
              nzTitle: 'Success',
              nzContent: 'Pickup Request has been approved'
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

  onDateChange(result: Date[]): void {
    if(result.length>0){
      const temp = this.rows.filter((d:allPickupRequestsLog)=> {
        return(d.original_date_requested < result[1] && d.original_date_requested> result[0])
      });
  
      // update the rows
      this.filteredRows = temp;
    }
    else{
      this.filteredRows= this.rows;
    }
    
    console.log('onChange: ', result);
  }

}
