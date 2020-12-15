import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-more-details-card',
  templateUrl: './more-details-card.component.html',
  styleUrls: ['./more-details-card.component.css']
})
export class MoreDetailsCardComponent implements OnInit {
  isLoading: boolean = false;
  constructor() { }

  @Input() showDetailsModal: boolean=false;
  @Input() toggleMoreDetailsModal: Function = ()=>{};
  @Input() moreDetailsUser: any;

  ngOnInit(): void {
  }

  handleStatusChange(){

  }

  handleCancel(data:boolean): void {
    this.showDetailsModal = false;
    this.toggleMoreDetailsModal(data);
  }

}
