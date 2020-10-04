import { Component, HostListener, OnInit } from '@angular/core';
import { CinemaService } from 'src/app/core/Servers/cinema.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ChangeThemeService } from 'src/app/core/Servers/change-theme.service';

@Component({
  selector: 'app-trang-chi-tiet',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0s', style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './trang-chi-tiet.component.html',
  styleUrls: ['./trang-chi-tiet.component.scss']
})
export class TrangChiTietComponent implements OnInit {
  isTheme:any;
  chiTietPhim: any = {};
  trailer:string =''
  cumRapActive:[];
  maCumRapActive:string;
  dieuKien:string = 'lichChieu'
  currentWidth:number
  @HostListener('window:resize')
  onResize(){
    this.currentWidth = window.innerWidth;
  }
  changeDieuKien(value){
    // active khi click vào 'Lịch Chiếu' hoặc 'Thông tin' hoặc 'Đánh Giá'
    this.dieuKien = value
  }
  getTrailer(){
    this.trailer = this.chiTietPhim.trailer
  }
  removeTrailer(){
    this.trailer=''
  }
  constructor(private cinema: CinemaService,
    private activatedRoute: ActivatedRoute,
    private data : ChangeThemeService) { }

  ngOnInit(): void {
    this.currentWidth = window.innerWidth;
    this.activatedRoute.params.subscribe({
      next:(params)=>{
        this.cinema.layLichChieuTheoPhim(params.maPhim).subscribe({
          next:(result)=>{
            this.chiTietPhim = result
            this.cumRapActive = result.heThongRapChieu[0].cumRapChieu
          }
        })
      },
      error:(err)=>{
      }
    })
    this.data.shareIsTheme.subscribe((data)=>{
      this.isTheme = data;
    })
    
  }
}
