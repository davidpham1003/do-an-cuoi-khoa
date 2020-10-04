import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-combo',
  templateUrl: './popup-combo.component.html',
  styleUrls: ['./popup-combo.component.scss']
})
export class PopupComboComponent implements OnInit,AfterViewInit {
  @Output() Popup = new EventEmitter()
  @Input() content:string;
  isPopup:boolean;
  closePopup(){
    this.isPopup = false
    this.Popup.emit( this.isPopup) 
  }
  popup(){
    this.isPopup = true
  }

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.isPopup = true;
    }, 2500);
  }

}
