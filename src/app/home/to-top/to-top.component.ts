import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-top',
  templateUrl: './to-top.component.html',
  styleUrls: ['./to-top.component.scss']
})
export class ToTopComponent implements OnInit {
  isToTop:boolean;
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isToTop = offset > 300 ? true : false
    console.log(offset, this.isToTop)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
