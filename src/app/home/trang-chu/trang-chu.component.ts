import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ChangeThemeService } from 'src/app/core/Servers/change-theme.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { MoviesService } from 'src/app/core/Servers/movies.service';
import { Movies } from 'src/app/core/models/Movies';

@Component({
  selector: 'app-trang-chu',

  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.scss'],
})
export class TrangChuComponent implements OnInit, AfterViewInit {
  @Input() isLogin;
  dsPhim:Movies[]=[];
  isTheme: any;
  constructor(private data: ChangeThemeService,private movieService: MoviesService) {}

  ngOnInit(): void {
    this.data.shareIsTheme.subscribe((data) => {
      this.isTheme = data;
    });
    this.movieService.layDanhSachPhim().subscribe({
      next: (result) => {
        this.dsPhim = result;
      },
    });
  }
  ngAfterViewInit(): void {

  }
}
