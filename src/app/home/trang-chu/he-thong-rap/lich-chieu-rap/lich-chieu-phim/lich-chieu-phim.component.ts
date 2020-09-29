import {
  Component,
  OnInit,
  OnChanges,
  Input,
  HostListener,
} from '@angular/core';
import { CinemaService } from '../../../../../core/Servers/cinema.service';
@Component({
  selector: 'app-lich-chieu-phim',
  templateUrl: './lich-chieu-phim.component.html',
  styleUrls: ['./lich-chieu-phim.component.scss'],
})
export class LichChieuPhimComponent implements OnInit, OnChanges {
  @Input() isTheme;
  @Input() maRap: string;
  @Input() maCumRap: string;
  indexx:number = 0

  constructor(private cinemaService: CinemaService) {}
  phimChieu: boolean = true;
  lichChieuPhim: [] = [];
  suatChieu: [] = [];
  MaPhim: number;
  isShowGio: boolean = false;
  currentWindowWidth: Number;
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
    // console.log(this.currentWindowWidth);
  }
  showGio() {
    this.isShowGio = !this.isShowGio;
  }
  layMaPhim(value:number) {
    this.MaPhim = value;
  }
  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
    // console.log(this.maRap)
  }
  ngOnChanges(): void {

    this.cinemaService.layLichChieuTheoRap(this.maRap).subscribe({
      next: (result) => {
        let dsRap: any[] = result[0].lstCumRap;

        setTimeout(()=>{
          let a = dsRap.filter((item) => item.maCumRap === this.maCumRap);
          if (a.length > 0) {
            this.lichChieuPhim = a[0].danhSachPhim;
            this.phimChieu = true;
          } else {
            this.phimChieu = false;
          }
        },100)
       
        console.log(this.maCumRap)
        // console.log('a',a[0].maCumRap)

        // dsRap.forEach((dsRapItem) => {
        //   if (dsRapItem.maCumRap === this.maCumRap) {
        //     this.lichChieuPhim = dsRapItem.danhSachPhim;
        //     SuatChieu = dsRapItem.danhSachPhim;
        //     return
        //   }else{
        //     this.lichChieuPhim = []
        //   }
        // });;
        // console.log(a);
        // console.log(result);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
