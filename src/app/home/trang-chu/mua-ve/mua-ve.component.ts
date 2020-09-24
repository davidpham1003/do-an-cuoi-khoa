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
  danhSachPhim: Movies[] = [];
  dsRap: any[] = [];
  danhSachNgayGioChieu: any[] = [];
  danhSachNgayChieu: any[] = [];
  danhSachGioChieu: any[] = [];
  selectFilm(tenPhim: string, maPhim) {
    this.dsRap = []
    this.TenRap = '';
    this.ngayChieu = '';
    this.gioChieu = '';
    this.TenPhim = tenPhim;
    this.isChonPhim = true;
    this.danhSachNgayChieu = [];
    this.cinema.layLichChieuTheoPhim(maPhim).subscribe({
      next: (result) => {
        console.log(result)
        let heThongRap = result.heThongRapChieu;
        for (let index = 0; index < heThongRap.length; index++) {
          for (let j = 0; j < heThongRap[index].cumRapChieu.length; j++) {
            this.dsRap.push(heThongRap[index].cumRapChieu[j]);
          }
        }
        console.log('rap',heThongRap);
      },
    });
    this.maLichChieu = null
  }

  selectCinema(value, value2) {
    //value1 : Tên Cụm Rạp, value2: Mã Cụm Rạp
    this.TenRap = value; // Gán tên rạp = giá trị truyền vào để binding vào html
    console.log(this.TenRap);
    this.ngayChieu = ''; // Khi chọn Rạp mới sẽ reset giá trị Ngày Chiếu
    this.gioChieu = ''; // Khi chọn Rạp mới sẽ reset giá trị Giờ Chiếu
    this.danhSachNgayChieu = []; // reset danh sách ngày chiếu khi chọn lại rap (do dùng push --> sẽ tìm cách khác tối ưu hơn)
    let index = this.dsRap.findIndex((rapItem) => rapItem.maCumRap == value2); // Lấy index trong mảng dsRap mã cụm rạp = với giá trị truyền vào (chỉ có 1)
    console.log('i', index);
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
    console.log(this.danhSachNgayChieu);
    this.maLichChieu = null
  }
  selectDate(value) {
    this.danhSachGioChieu = []; // reset danh sách Giờ chiếu khi chọn lại Ngày Chiếu (do dùng push --> sẽ tìm cách khác tối ưu hơn)
    this.ngayChieu = value; // Gán ngày chiếu bằng value để binding ra html
    this.gioChieu = ''; // reset giá trị giờ chiếu khi thay đổi ngày chiếu
    this.danhSachNgayGioChieu.forEach((item) => {
      // Tìm trong DS ngày Giờ có giá ngày giống vs value sẽ đẩy giá trị vào DS Giờ chiếu theo ngày
      if (item.ngayChieuGioChieu.substring(0, 10) == value) {
        this.danhSachGioChieu = [...this.danhSachGioChieu, item];
      }
    });
    this.maLichChieu = null
  }
 
  selectTime(value,value2){
    //value : Giờ Chiếu, value2: Mã lịch chiếu
    this.gioChieu = value; // Gán Giờ chiếu bằng value để binding ra html
    this.maLichChieu = value2;// Gán Mã Lịch Chiếu chiếu bằng value2 để lấy API truy cập trang đặt vé
    console.log(value)
  }
  datVe(){
    if(this.currentUser.taiKhoan){
      if(this.maLichChieu){
        this.router.navigate([`/datve/${this.maLichChieu}`])
      }else{
        this.warning = 'chonPhim'
      }
    }else{
      this.warning = 'muaVe'
    }
    console.log(this.warning)
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
    this.moviesService.layDanhSachPhim().subscribe({
      next: (result) => {
        this.danhSachPhim = result;

      },
    });
  }
}
