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
  isActive:boolean = true;
  dsPhim:Movies[]=[];
  doiPhim(boolean){
    this.isActive = boolean
  }
  constructor(private movieService: MoviesService) { 
    this.movieService.layDanhSachPhim().subscribe({
      next: (result) => {
        this.dsPhim = result;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // console.log('GET MOVIES DONE');
      },
    });
  }

  ngOnInit(): void {
  }

}
