import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GheService } from '../../core/Servers/ghe.service';
import { CountdownComponent } from 'ngx-countdown';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-trang-dat-ve',
  templateUrl: './trang-dat-ve.component.html',
  styleUrls: ['./trang-dat-ve.component.scss'],
})
export class TrangDatVeComponent implements OnInit, AfterViewInit {
  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  danhSachGhe: any[];
  thongTinPhim: any;
  gheDangChon: any[] = [];
  tienVe: number = 0;
  tienCombo: number = 0;
  isCombo: boolean = false; //show-hide combo
  isWarning: boolean; // show-hide warning
  isThanhToan: boolean = false; // show-hide button mua vé (ở màn đt)
  isConfirm: boolean; // show hide button đặt ghế (ở màn đt)
  mangDatVe: any = {};
  leftTime: number = 300; // Thời gian count down
  currentWidth: number;
  currentHeight: number;
  currentUser: any;
  mangCombo: any[] = [
    {
      id: 'combo1',
      ten: 'Bắp + Coca',
      soLuong: 0,
      img: '../../../assets/img/combo1.png',
      gia: 75000,
      thanhTien: 0,
    },
    {
      id: 'combo2',
      ten: 'Bắp + 2 Coca',
      soLuong: 0,
      img: '../../../assets/img/combo2.png',
      gia: 85000,
      thanhTien: 0,
    },
  ];
  @HostListener('window:resize')
  onResize() {
    this.currentWidth = window.innerWidth;
    this.currentHeight = window.innerHeight;
    if (this.currentWidth > 420) {
      // màn lớn hươn 420 --> hiển thị button mua vé , hide button đặt ghế
      this.isThanhToan = true;
      this.isConfirm = true;
    } else {
      // màn nhỏ hươn 420 --> hiển thị button đặt ghế , hide button mua vé
      this.isThanhToan = false;
      this.isConfirm = false;
    }
  }

  constructor(
    public router: Router,
    private auth: AuthenticationService,
    private ghe: GheService,
    private activatedRoute: ActivatedRoute
  ) {}

  warningGhe() {
    if (this.gheDangChon[1]) {
      for (let i = 0; i < this.gheDangChon.length - 1; i++) {
        let a = Math.abs(
          parseInt(this.gheDangChon[i].tenGhe) -
            parseInt(this.gheDangChon[i + 1].tenGhe)
        );
        if (a === 2) {
          // Không được có ghế trống ở giữa. 
          this.isWarning = true;
          return;
        } else {
          this.isWarning = false;
        }
      }
    }
  }
  onTimerFinished(event:Event) {
    if (event['action'] == 'done') {
      // hết giờ sẽ open modal 
      this.openModal.nativeElement.click();
    }
  }

  datCombo(id: string, value: boolean) {
    // xử lý đặt bắp nước
    this.mangCombo.forEach((combo) => {
      if (combo.id === id) {
        if (value) {
          combo.soLuong += 1;
        } else {
          if (combo.soLuong == 0) {
            return;
          } else {
            combo.soLuong -= 1;
          }
        }
        combo.thanhTien = combo.soLuong * combo.gia;
      }
    });
    this.tienCombo = this.mangCombo.reduce((combo, comboItem, index) => {
      return (combo += comboItem.thanhTien);
    }, 0);
  }
  combo() {
    this.isCombo = !this.isCombo; // show-hide combo khi click
  }
  closeCombo() {
    this.isCombo = false; // hide combo khi click (x)
  }
  datGhe(ghe) {
    //Xử lý đặt ghế
    if (ghe.daDat) {
      this.gheDangChon.push(ghe);
      this.gheDangChon.sort(
        (a, b) => parseFloat(a.tenGhe) - parseFloat(b.tenGhe)
      );
      this.warningGhe();
    } else {
      this.isWarning = false;
      let index = this.gheDangChon.findIndex(
        (itemGhe) => itemGhe.tenGhe === ghe.tenGhe
      );
      this.gheDangChon.splice(index, 1);
      this.warningGhe();
    }
    this.tienVe = this.gheDangChon.reduce((ve, gheItem, index) => {
      return (ve += gheItem.giaVe);
    }, 0);
  }
  datVe() {
    // xử lý mua vé
    if (this.currentUser.taiKhoan) {
      // Nếu có tài khoản ==> mới được đặt vé
      this.mangDatVe = {
        maLichChieu: this.thongTinPhim.maLichChieu,
        danhSachVe: this.gheDangChon,
        taiKhoanNguoiDung: this.currentUser.taiKhoan,
      };
      this.ghe.datVe(this.mangDatVe).subscribe({
        next: (result) => {
          Swal.fire({
            title: 'Xác nhận đặt vé ?',
            icon: 'question',
            reverseButtons:true,
            cancelButtonColor:'#d33',
            showCancelButton: true,
            confirmButtonText: 'Xác Nhận!',
            cancelButtonText: 'Hủy',
          }).then((result) => {
            if(result.isConfirmed){
              Swal.fire('', 'Đặt vé thành công!', 'success').then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: 'Tiếp tục đặt vé ?', 
                    icon: 'question',
                    showDenyButton: true,
                    confirmButtonText: 'Xác Nhận!',
                    denyButtonText: 'Xem lịch sử đặt vé',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      location.reload();
                    } else {
                      // Tới trang thông tin đặt vé khi Click 'Xem lịch sử đặt vé'
                      this.gheDangChon = []
                      this.router.navigate(['/thongTin']); 
                      this.ghe.getLichDatVe('lichSuVe') // xét method ở thông tin thành ' lịch sử đặt vé'
                    }
                  });
                }
              });
            }
          });
        },
      });
    } else {
      Swal.fire(
        'Đăng Nhập?',
        'Vui lòng đăng nhập để tiếp tục đặt ghế !',
        'warning'
      );
    }
  }

  datVeBuoc1() {
    this.isConfirm = true;
    setTimeout(() => {
      this.isThanhToan = true;
    }, 1000);
  }
  backBuoc1() {
    this.isConfirm = false;
    this.isThanhToan = false;
  }

  ngOnInit(): void {
    this.currentHeight = window.innerHeight;
    this.currentWidth = window.innerWidth;
    if (this.currentWidth > 420) {
      this.isThanhToan = true;
      this.isConfirm = true;
    } else {
      this.isThanhToan = false;
      this.isConfirm = false;
    }
    this.auth.currentUser.subscribe({
      next: (data) => {
        if (data) {
          this.currentUser = data;
        }
      },
    });
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.ghe.layDanhSachGhe(params.maLichChieu).subscribe({
          next: (result) => {
            this.danhSachGhe = result.danhSachGhe;
            this.thongTinPhim = result.thongTinPhim;
          },
          complete: () => {
          },
        });
      },
    });
  }
  ngAfterViewInit() {}
}
