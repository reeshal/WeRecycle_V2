import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
})
export class ImageModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() imageBefore: string;
  @Input() imageAfter: string;
}
