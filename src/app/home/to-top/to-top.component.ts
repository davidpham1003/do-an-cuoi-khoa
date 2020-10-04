import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-top',
  templateUrl: './to-top.component.html',
  styleUrls: ['./to-top.component.scss']
})
export class ToTopComponent implements OnInit {
  isToTop:boolean;
  currentWidth:number
  @HostListener("window:scroll")
  @HostListener("window:resize")
  // onResize(){
  //   this.currentWidth = window.innerWidth
  // }
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isToTop = offset > 300 ? true : false
  }
  constructor() { }

  ngOnInit(): void {
    this.currentWidth = window.innerWidth
  }

}
