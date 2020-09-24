import { Component, OnInit } from '@angular/core';
import {MangSliderService} from '../../../core/Servers/mang-slider.service'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  trailer:string 
  closeModal(){
    this.trailer=''
  }
  getTrailer(value){
    this.trailer = value

  }
  mangSlider:any[];
  constructor( public slider : MangSliderService ) {
   }

  ngOnInit(): void {
    this.mangSlider = this.slider.mangSlider 

  }

}
