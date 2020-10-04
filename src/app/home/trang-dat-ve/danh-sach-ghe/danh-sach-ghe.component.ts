import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-danh-sach-ghe',
  templateUrl: './danh-sach-ghe.component.html',
  styleUrls: ['./danh-sach-ghe.component.scss']
})
export class DanhSachGheComponent implements OnInit {
  @Input() isWarning:boolean;
  @Input() danhSachGhe:[]
  @Output() getGhe = new EventEmitter()
  sendTenGhe(value){
    this.getGhe.emit(value)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
