import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-region-card',
  templateUrl: './region-card.component.html',
  styleUrls: ['./region-card.component.css']
})
export class RegionCardComponent implements OnInit {

  constructor() { }
  @Input() imageUrl:string ='';
  @Input() regionName:string ='';
  @Input() regionPrice: any;
  
  ngOnInit(): void {
  }

}
