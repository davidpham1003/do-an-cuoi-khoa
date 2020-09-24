import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-combo',
  templateUrl: './popup-combo.component.html',
  styleUrls: ['./popup-combo.component.scss']
})
export class PopupComboComponent implements OnInit {
  @Output() Popup = new EventEmitter()
  isPopup:boolean;
  closePopup(){
    this.isPopup = false
    this.Popup.emit( this.isPopup) 
    console.log(this.isPopup)
  }
  popup(){
    this.isPopup = true
    console.log(this.isPopup)
    this.Popup.emit( this.isPopup) 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
