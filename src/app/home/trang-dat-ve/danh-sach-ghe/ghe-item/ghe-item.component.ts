import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ghe-item',
  templateUrl: './ghe-item.component.html',
  styleUrls: ['./ghe-item.component.scss']
})
export class GheItemComponent implements OnInit {
  @Input() isWarning:boolean;
  @Input() gheItem;
  @Output() getGhe = new EventEmitter()
  isDatGhe:boolean = false
  tenGhe:string
  constructor() { }
  datGhe(){
    this.isDatGhe = !this.isDatGhe
    const ghe:any ={
      tenGhe: this.gheItem.tenGhe,
      daDat : this.isDatGhe,
      giaVe: this.gheItem.giaVe,
      maGhe: this.gheItem.maGhe
    }
    this.getGhe.emit(ghe)
  }
  ngOnInit(): void {
  }

}
