import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../../core/Servers/movies.service';
import { Movies } from '../../../core/models/Movies';
import { CinemaService } from '../../../core/Servers/cinema.service';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mua-ve',
  templateUrl: './mua-ve.component.html',
  styleUrls: ['./mua-ve.component.scss'],
})
export class MuaVeComponent implements OnInit {
  @Input() isTheme;
  @Input() danhSachPhim: Movies[] = [];
  currentUser:any = {}
  isChonPhim: boolean = false;
  isChonRap: boolean = false;
  isChonNgay: boolean = false;
  isChonGio: boolean = false;
  TenPhim: string = '';
  TenRap: string = '';
  ngayChieu: string = '';
  gioChieu: string = '';
  warning:string;
  maLichChieu:number;
  dsRap: any[] = [];
  danhSachNgayGioChieu: any[] = [];
  danhSachNgayChieu: any[] = [];
  danhSachGioChieu: any[] = [];
  selectFilm(tenPhim: string, maPhim) {
    this.isChonNgay = false //reset mảng giờ chiếu khi thay đổi phim
    this.dsRap = [] //reset mảng rạp chiếu khi thay đổi phim
    this.danhSachNgayChieu = []; //reset mảng ngày chiếu khi thay đổi phim
    this.TenRap = '';//reset tên Rạp khi thay đổi phim
    this.ngayChieu = '';//reset Ngày Chiếu khi thay đổi phim
    this.gioChieu = '';//reset Giờ chiếu khi thay đổi phim
    this.TenPhim = tenPhim; // set tên phim trên dropdown khi chọn phim
    this.cinema.layLichChieuTheoPhim(maPhim).subscribe({
      // gọi API rạp chiếu theo tên phim được chọn
      next: (result) => {
        let heThongRap = result.heThongRapChieu;
        for (let index = 0; index < heThongRap.length; index++) {
          for (let j = 0; j < heThongRap[index].cumRapChieu.length; j++) {
            this.dsRap.push(heThongRap[index].cumRapChieu[j]);
          }
        }
      },
    });
    this.maLichChieu = null // set mã lịch chiếu về null khi chọn phim ==> tránh router sang mua vé khi chưa chọn ngày giờ khi reset chọn phim
  }

  selectCinema(value, value2) {
    this.isChonNgay = false
    //value1 : Tên Cụm Rạp, value2: Mã Cụm Rạp
    this.TenRap = value; // Gán tên rạp = giá trị truyền vào để binding vào html
    this.ngayChieu = ''; // Khi chọn Rạp mới sẽ reset giá trị Ngày Chiếu
    this.gioChieu = ''; // Khi chọn Rạp mới sẽ reset giá trị Giờ Chiếu
    this.danhSachNgayChieu = []; // reset danh sách ngày chiếu khi chọn lại rap (do dùng push --> sẽ tìm cách khác tối ưu hơn)
    let index = this.dsRap.findIndex((rapItem) => rapItem.maCumRap == value2); // Lấy index trong mảng dsRap mã cụm rạp = với giá trị truyền vào (chỉ có 1)
    this.danhSachNgayGioChieu = this.dsRap[index].lichChieuPhim; // Gán ds ngày Giờ chiếu (dùng chung cho ngày và giờ) = mảng lịch chiếu phim trong dsRap vị trị thứ index
    for (let i = 0; i < this.danhSachNgayGioChieu.length; i++) {
      //
      this.danhSachNgayChieu.push(
        this.danhSachNgayGioChieu[i].ngayChieuGioChieu.substring(0, 10)
      );
    }
    this.danhSachNgayChieu = this.danhSachNgayChieu.filter(
      (item, index) => this.danhSachNgayChieu.indexOf(item) === index
    );
    this.maLichChieu = null // set mã lịch chiếu về null khi chọn phim ==> tránh router sang mua vé khi chưa chọn ngày giờ khi reset chọn phim
  }
  selectDate(value) {
    this.isChonNgay = true // set chọn giờ có giá trị
    this.danhSachGioChieu = []; // reset danh sách Giờ chiếu khi chọn lại Ngày Chiếu (do dùng push --> sẽ tìm cách khác tối ưu hơn)
    this.ngayChieu = value; // Gán ngày chiếu bằng value để binding ra html
    this.gioChieu = ''; // reset giá trị giờ chiếu khi thay đổi ngày chiếu
    this.danhSachNgayGioChieu.forEach((item) => {
      // Tìm trong DS ngày Giờ có giá ngày giống vs value sẽ đẩy giá trị vào DS Giờ chiếu theo ngày
      if (item.ngayChieuGioChieu.substring(0, 10) == value) {
        this.danhSachGioChieu = [...this.danhSachGioChieu, item];
      }
    });
    this.maLichChieu = null // set mã lịch chiếu về null khi chọn phim ==> tránh router sang mua vé khi chưa chọn ngày giờ khi reset chọn phim
  }
 
  selectTime(value,value2){
    //value : Giờ Chiếu, value2: Mã lịch chiếu
    this.gioChieu = value; // Gán Giờ chiếu bằng value để binding ra html
    this.maLichChieu = value2

  }
  datVe(){
    if(this.currentUser.taiKhoan){
      if(this.maLichChieu){
        this.router.navigate([`/datve/${this.maLichChieu}`])
      }else{
        this.warning = 'chonPhim' // truyền warning sang modal warning
      }
    }else{
      this.warning = 'muaVe' // truyền warning sang modal warning
    }
  }

  constructor(
    private auth:AuthenticationService,
    private moviesService: MoviesService,
    private cinema: CinemaService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.auth.currentUser.subscribe({
      next: (result) => {
        this.currentUser = result;
      },
    });
  }
}
