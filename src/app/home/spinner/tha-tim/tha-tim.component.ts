import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tha-tim',
  templateUrl: './tha-tim.component.html',
  styleUrls: ['./tha-tim.component.scss']
})
export class ThaTimComponent implements OnInit {
  @Input() isActive:boolean;


  constructor() { }

  ngOnInit(): void {
  }

}
