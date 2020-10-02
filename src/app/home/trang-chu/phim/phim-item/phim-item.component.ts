import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $ : any
@Component({
  selector: 'app-phim-item',
  templateUrl: './phim-item.component.html',
  styleUrls: ['./phim-item.component.scss'],
})
export class PhimItemComponent implements OnInit {
  @Input() isTheme;
  @Input() phim;
  @Output() transTrailer = new EventEmitter()
  @Output() transIsModal = new EventEmitter()
  isModal:boolean;
  Trailer:string
  getTrailer(value){
    this.Trailer = value;
    this.isModal = true;
    this.transTrailer.emit(this.Trailer)
    this.transIsModal.emit(this.isModal)
  }
  danhGia: any = [];

  constructor() {}

  ngOnInit(): void {
  }
}
