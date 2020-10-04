import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-danh-gia',
  templateUrl: './danh-gia.component.html',
  styleUrls: ['./danh-gia.component.scss'],
})
export class DanhGIaComponent implements OnInit {
  @Input() danhGia;
  @Input() phimItem;
  constructor() {}
  soLuongSao:string [] = [];

  ngOnInit(): void {
    // set đánh giá cho từng phim
    let DanhGia;
    let star = this.danhGia % 2
    for (let index = 0; index < Math.floor((this.danhGia)/2); index++) {
      DanhGia =
        "../../../../../../../assets/img/star-icon.png"
      this.soLuongSao.push(DanhGia);
    }
    if (star === 1){
      this.soLuongSao.push("../../../../../../../assets/img/star-half.png")
    }
  }

}
