import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
