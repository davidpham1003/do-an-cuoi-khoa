import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal-youtube',
  templateUrl: './modal-youtube.component.html',
  styleUrls: ['./modal-youtube.component.scss'],
})
export class ModalYoutubeComponent implements OnInit,OnChanges {
  @Input() trailer: string;
  currentHeight:number
  isClose:boolean
  constructor() {}
  @HostListener ('window:resize')
  onResize(){
    this.currentHeight = window.innerHeight
  }

  ngOnInit(): void {
    this.currentHeight = window.innerHeight;
  }
  ngOnChanges(){
  }
}
