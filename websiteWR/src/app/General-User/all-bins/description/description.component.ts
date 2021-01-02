import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  constructor() {}

  @Input() status: any;
  @Input() description='';
  @Input() id: any;
  @Input() imageUrl='';
  @Input() materials='';

  bin_materials: String[];

  ngOnInit(): void {}
  ngOnChanges() {
    this.bin_materials = this.materials.split(',');
  }

}
