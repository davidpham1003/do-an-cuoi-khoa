import { Component, OnInit } from '@angular/core';
import { ChangeThemeService } from 'src/app/core/Servers/change-theme.service';
import {MangSliderService} from '../../../core/Servers/mang-slider.service'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  trailer:string 
  isTheme:any;
  closeModal(){
    this.trailer='' //close modal youtube
  }
  getTrailer(value){
    this.trailer = value //get trailer youtube
  }
  mangSlider:any[];
  constructor( public slider : MangSliderService,private changeTheme : ChangeThemeService ) {
   }

  ngOnInit(): void {
    this.mangSlider = this.slider.mangSlider 
    this.changeTheme.shareIsTheme.subscribe(data=>{
      this.isTheme = data
    })
  }

}
