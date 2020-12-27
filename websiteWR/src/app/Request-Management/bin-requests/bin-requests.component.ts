import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { allBinsRequests } from '../Models/all_bin_requests';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BinRequestService } from '../services/bin-request.service';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bin-requests',
  templateUrl: './bin-requests.component.html',
  styleUrls: ['./bin-requests.component.css']
})
export class BinRequestsComponent implements OnInit {
  isLoading: boolean = true;
  search: string = "";
  showClearButton = false;
  selectedStatus:any;
  date = null;

  rows:Array<allBinsRequests> = [];
  filteredRows:Array<allBinsRequests> = [];

  constructor(private requestsService: BinRequestService,private modal: NzModalService) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(){
    this.requestsService.getRequests().pipe(
      finalize(()=>{
        this.isLoading = false;
      })
    )
    .subscribe(   
      (data: Array<allBinsRequests>) => {
        
        this.rows=data;
        this.filteredRows=this.rows;

        this.rows.forEach((value)=>{
          value.original_datetime= new Date(value.dateTime);
          value.dateTime=value.dateTime.slice(8,10)+'/'+value.dateTime.slice(5,7)+'/'+value.dateTime.slice(0,4)+' at '+value.dateTime.slice(11,16);
        });

        console.log(this.rows);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  handleNewStatus(requestId: number, status:string){

  }

  applySearch(event:any) {
    const val = event.target.value.toLowerCase();
    this.showClearButton = true;
    // filter our data
    const temp = this.rows.filter((d:any)=> {
      return (d.fullname.toLowerCase().indexOf(val) !== -1 || !val)
      ||(d.phoneno.toLowerCase().indexOf(val) !== -1 || !val)
      ||(d.material.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.filteredRows = temp;
  }

  clearFilter():void{
    this.showClearButton=false;
    this.filteredRows=this.rows;
    this.selectedStatus="";
    this.search="";
  }

  handleStatusChange(): void{
    console.log(this.selectedStatus);
    this.showClearButton = true;
    this.selectedStatus== 'All' ? this.filteredRows = this.rows :
      this.filteredRows = this.rows.filter((b:any) => b.status === this.selectedStatus);
  }

  onDateChange(result: Date[]): void {
    if(result.length>0){
      const temp = this.rows.filter((d:allBinsRequests)=> {
        return(d.original_datetime < result[1] && d.original_datetime> result[0])
      });

      this.filteredRows = temp;
    }
    else{
      this.filteredRows= this.rows;
    }
  }

}
