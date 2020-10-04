import { Component, OnInit, Input } from '@angular/core';
import { Movies } from 'src/app/core/models/Movies';
import { MoviesService } from 'src/app/core/Servers/movies.service';
import { trigger, transition, state, style, animate } from '@angular/animations';
declare var $: any;


@Component({
  selector: 'app-phim',
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('600ms' )
      ]),
      transition(':leave',
        animate('0s', style({opacity: 0})))
    ])
  ],
  templateUrl: './phim.component.html',
  styleUrls: ['./phim.component.scss']
})
export class PhimComponent implements OnInit {
  @Input () isTheme
  @Input () dsPhim:Movies[] = []
  isActive:boolean = true; // active khi click 'phim đang chiếu' hoặc 'phim sắp chiếu'
  doiPhim(boolean){
    this.isActive = boolean // active khi click 'phim đang chiếu' hoặc 'phim sắp chiếu'
  }
  constructor(private movieService: MoviesService) { 
   
  }

  ngOnInit(): void {
   
  }

}
