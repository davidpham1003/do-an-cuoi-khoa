import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.scss'],
})
export class ModalWarningComponent implements OnInit, OnChanges {
  @Input() warning: string;
  thongBao: string = 'Không thể để trống ghế ở giữa!';
  constructor() {}
  currentWidth:number
  currentHeight:number
  @HostListener('window:resize')
  onResize(){
    this.currentWidth = window.innerWidth
    this.currentHeight = window.innerHeight
  }
  reload() {
    if (this.warning == 'timer') {
      location.reload();
    }
    return;
  }
  ngOnChanges() {
    switch (this.warning) {
      case 'muaVe': {
        this.thongBao = 'Vui Lòng Đăng Nhập Để Mua Vé!';
        break;
      }
      case 'danhGia': {
        this.thongBao = 'Vui Lòng Đăng Nhập Để Đánh Giá Phim!';
        break;
      }
      case 'timer': {
        this.thongBao = 'Đã hết thời gian giữ ghế!';
        break;
      }
      case 'chonPhim': {
        this.thongBao = 'Vui Lòng Chọn Phim và Giờ Chiếu!';
        break;
      }
      default:
        break;
    }

  }
  ngOnInit(): void {
    this.currentWidth = window.innerWidth
    this.currentHeight = window.innerHeight

  }
}
