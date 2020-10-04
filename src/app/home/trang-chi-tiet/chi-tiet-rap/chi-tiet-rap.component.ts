import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';

@Component({
  selector: 'app-chi-tiet-rap',
  templateUrl: './chi-tiet-rap.component.html',
  styleUrls: ['./chi-tiet-rap.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class ChiTietRapComponent implements OnInit, OnChanges {
  @Input() isTheme;
  @Input() chiTietRap: any[] = []; // Hệ thống rạp chiếu theo phim *1
  @Input() cumRamChieu: any[] = []; // Lấy Cụm Rạp đầu tiên để Active *2
  @Input() chiTietPhim; // Chi tiết phim (để lấy hình ảnh) *3
  lichChieu: any[] = []; // Lịch chiếu phim (gồm ngày và giờ) *4
  ngayChieu: any[] = []; // tách ngày chiếu từ lịch chiếu *5
  gioChieu: any[] = []; // tách giờ chiếu từ lịch chiếu *6
  maRap: string = ''; // Để thay đổi màu font khi rạp # nhau *7
  indexActive: number = 0; // Để active rạp đầu tiên *8
  indexActiveCumRap: number = 0; // Để active Cụm rạp đầu tiên *9
  ngayActive: number = 0;
  currentUser: any = {};
  public currentWindowWidth: number;
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }
  changeIndex(index) {
    // Active icon rạp khi click vào
    this.indexActive = index;
  }
  changeIndexCumRap(index) {
    // Active icon Cụm rạp khi click vào
    this.indexActiveCumRap = index;
  }
  changeNgayActive(value) {
    this.ngayActive = value;
  }
  changeRapChieu(value) {
    // Thay đổi các thông số khi thay đổi rạp
    this.chiTietRap.forEach((rapItem) => {
      // lọc trong hệ thống rạp
      if (rapItem.maHeThongRap === value) {
        //Xét điều kiện, value là mã hệ thống rạp
        this.lichChieu = []; //Reset lại mảng lịch chiếu khi click vì Ngày chiếu và giờ chiếu dùng push
        this.maRap = rapItem.maHeThongRap; // Thay đổi mã rạp *9
        this.cumRamChieu = rapItem.cumRapChieu; // Thay đổi mảng cụm rạp chiếu theo rạp
        this.lichChieu = this.cumRamChieu[0].lichChieuPhim; // Lịch chiếu hiện thị phần tử đầu tiên của mảng
        this.setNgayChieu(); // Set lại ngày và giờ chiếu
      }
    });
  }
  changeLichChieu(value) {
    //Thay đổi thông số khi thay đổi cụm rạp
    this.cumRamChieu.forEach((cumItem) => {
      // lọc trong hệ thống cụm rạp
      if (cumItem.maCumRap === value) {
        // Xét điều kiện, value là mã cụm rạp
        this.lichChieu = []; //Reset lại mảng lịch chiếu khi click vì Ngày chiếu và giờ chiếu dùng push
        this.lichChieu = cumItem.lichChieuPhim; //Gán mảng mới có lịch chiếu theo cụm rạp
        this.setNgayChieu(); // Set lại ngày và giờ chiếu
      }
    });
  }
  changeTime(value) {
    //Thay đổi thông số khi thay đổi Ngày chiếu
    this.setGioChieu(value); // Set lại giờ chiếu khi đổi ngày
  }
  // 2 hàm set lại ngày và giờ chiếu
  setNgayChieu() {
    this.ngayChieu = []; //Set ngày chiếu về rỗng
    for (let i = 0; i < this.lichChieu.length; i++) {
      this.ngayChieu.push(this.lichChieu[i].ngayChieuGioChieu.split('T')[0]); //push vào mảng ngayChieu ngày chiếu từ lịch chiếu
    }
    this.ngayChieu = this.ngayChieu.filter(
      (item, index) => this.ngayChieu.indexOf(item) == index // Xóa phần tử những ngày chiếu lặp nhau
    );
    this.indexActiveCumRap = 0;
    this.ngayActive = 0;
    this.setGioChieu(this.ngayChieu[0]); // Set lại giờ chiếu hiển thị là ngày chiếu đầu tiền trong mảng
  }
  setGioChieu(value) {
    this.gioChieu = this.lichChieu.filter(
      (item) => item.ngayChieuGioChieu.split('T')[0] == value // Lọc giờ chiếu theo ngày
    );

  }
  datVe(value) {
    //value = ma lich chieu
    if (this.currentUser.taiKhoan) {
      this.router.navigate([`/datve/${value}`]);
    }
  }
  constructor(private auth: AuthenticationService, private router: Router) {}
  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
    this.maRap = this.chiTietRap[0].maHeThongRap; // Chọn Mã rạp iển thị lần đầu
    this.lichChieu = this.cumRamChieu[0].lichChieuPhim; // Lịch chiếu iển thị lần đầu
    this.setNgayChieu(); // Set ngày giờ chiếu hiển thị lần đầu
    this.auth.currentUser.subscribe({
      next: (result) => {
        this.currentUser = result;
      },
    });
  }
  ngOnChanges() {}
}
