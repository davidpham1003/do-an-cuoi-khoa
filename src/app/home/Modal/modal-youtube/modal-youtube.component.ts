import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-modal-youtube',
  templateUrl: './modal-youtube.component.html',
  styleUrls: ['./modal-youtube.component.scss'],
})
export class ModalYoutubeComponent implements OnInit,OnChanges {
  @Input() trailer: string;
  isClose:boolean
  constructor() {}

  ngOnInit(): void {
    
  }
  ngOnChanges(){
    console.log(this.trailer)
  }
}
