import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PickupRequestsService } from '../Services/pickup-requests.service';
import { myPickupRequests } from '../Models/pickup_request';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pickup-requests',
  templateUrl: './pickup-requests.component.html',
  styleUrls: ['./pickup-requests.component.css']
})
export class PickupRequestsComponent implements OnInit {
  isLoading: boolean = true;
  phoneno: string='51234569';
  showClearButton = false;
  selectedStatus:any;
  dateRange = null;
  dateSelected:Date= new Date();

  rows:Array<myPickupRequests> = [];
  filteredRows:Array<myPickupRequests> = [];
  binIdList:any;

  requestForm= new FormGroup({
    dateRequested: new FormControl(this.dateSelected),
    binId: new FormControl('', [Validators.required]),
  });

  constructor(private pickupreq: PickupRequestsService) { }

  ngOnInit(): void {
    // this.phoneno=this.storageService.getCookie('phoneno');

    this.fetchData();
  }

  fetchData(){
    const requests = forkJoin([
      this.pickupreq.getRequests(),
      this.pickupreq.getBinId(this.phoneno),
    ]);
    requests.pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    )
    .subscribe(
      (data: any) => {
        this.rows = data[0];
        this.filteredRows = data[0];
        this.binIdList = data[1];

        this.rows.forEach((value)=>{
          value.original_date_requested= new Date(value.date_requested);
          value.date_requested=value.date_requested.slice(8,10)+'/'+value.date_requested.slice(5,7)+'/'+value.date_requested.slice(0,4)+' at '+value.date_requested.slice(11,16);
          value.date_applied=value.date_applied.slice(8,10)+'/'+value.date_applied.slice(5,7)+'/'+value.date_applied.slice(0,4)+' at '+value.date_applied.slice(11,16);
        });

        console.log(this.filteredRows);
        console.log(this.binIdList);
      },
      (err) => {
        console.log(err.message);
      }
    )
  }

  clearFilter():void{
    this.showClearButton=false;
    this.filteredRows=this.rows;
    this.selectedStatus="";
  }

  handleStatusChange(): void{
    console.log(this.selectedStatus);
    this.showClearButton = true;
    this.selectedStatus== 'All' ? this.filteredRows = this.rows :
      this.filteredRows = this.rows.filter((b:any) => b.status === this.selectedStatus);
  }

  onDateChange(result: Date[]): void {
    if(result.length>0){
      const temp = this.rows.filter((d:myPickupRequests)=> {
        return(d.original_date_requested < result[1] && d.original_date_requested > result[0])
      });

      this.filteredRows = temp;
    }
    else{
      this.filteredRows= this.rows;
    }
  }

  onDateSelected(result: Date){
    this.dateSelected=result;
    console.log(this.dateSelected);
  }

  changeBinId(e:any){
    this.binId.setValue(e.target.value, {onlySelf: true})
    console.log(e.target.value)
  }

  get binId(){
    return this.requestForm.get('binId') as FormControl;
  }

  sendRequest(){
    
  }

}
