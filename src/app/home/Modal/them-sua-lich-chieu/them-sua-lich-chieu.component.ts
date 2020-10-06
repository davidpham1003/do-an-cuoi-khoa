import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CinemaService } from 'src/app/core/Servers/cinema.service';
import { GheService } from 'src/app/core/Servers/ghe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-them-sua-lich-chieu',
  templateUrl: './them-sua-lich-chieu.component.html',
  styleUrls: ['./them-sua-lich-chieu.component.scss'],
})
export class ThemSuaLichChieuComponent implements OnInit, OnChanges,OnDestroy {
  @Input() objectThemLichChieu;
  @Output('close') btnClose : ElementRef; 
  formLichChieu: FormGroup;
  heThongRap: any[];
  cumRapChieu: any[];
  maRapTheoCum: any[];

  constructor(private cinema: CinemaService, private ghe: GheService) {
    this.formLichChieu = new FormGroup({
      maPhim: new FormControl(this.objectThemLichChieu ? this.objectThemLichChieu.maPhim : null),
      ngayChieuGioChieu: new FormControl(null, Validators.required),
      maRap: new FormControl(null , Validators.required),
      giaVe: new FormControl('75000', Validators.required),
      
    });
  }

  addLichChieu(value) {
    let lichChieu = {
      maRap : parseInt(value.maRap), // Chuyển mã rạp về thành dạng Number
      giaVe:parseInt(value.giaVe),// Chuyển Giá vé về thành dạng Number
      maPhim:parseInt(value.maPhim),// Chuyển Mã phim về thành dạng Number
      ngayChieuGioChieu:value.ngayChieuGioChieu
    };
    this.ghe.taoLichChieu(lichChieu).subscribe({
      //Api tạo lịch chiếu
      next: () => {
        Swal.fire({
          title: 'Tạo lịch chiếu!',
          text: 'Tạo lịch chiếu thành công',
          icon: 'success',
        }).then(result=>{
          if(result.isConfirmed){
            this.btnClose.nativeElement.click() // đóng modal khi click xác nhận tạo lịch chiếu thành công
          }
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Tạo lịch chiếu!',
          text: `${err.error}`,
          icon: 'warning',
        });
      },
    });
  }
  layMaHeThongRap(event) {
    // khi thay đổi Rạp thì cụm rạp và mã hệ thống rạp sẽ thay đổi
    this.layApiCumRap(event.target.value);
  }
  layMaRap(event) {
    // Khi thay đổi cụm rạp ==> maRapTheoCum sẽ thay đổi. với event = maCumRap
    let cumRap = this.cumRapChieu.filter(
      (itemCumRap) => itemCumRap.maCumRap === event.target.value
    );
    this.maRapTheoCum = cumRap[0].danhSachRap;
  }
  layApiCumRap(value) {
    // Hàm lấy thông tin cụm rạp với value = maHeThongRap
    this.cinema.layThongTinCumRap(value).subscribe({
      next: (result) => {
        this.cumRapChieu = result;
        this.maRapTheoCum = result[0].danhSachRap; // Mã rạp ban đầu = dsRap đầu tiên.
        this.formLichChieu.patchValue({ // set value mã rạp đầu tiên
          maRap:this.maRapTheoCum[0].maRap
        })
      },
    });
  }

  ngOnChanges() {
    this.formLichChieu.reset();
    if (this.objectThemLichChieu) {
      this.formLichChieu.patchValue({
        maPhim: this.objectThemLichChieu.maPhim,
      });
      console.log(this.objectThemLichChieu.maPhim)
    }
   
  }
  ngOnInit(): void {
    // Lấy ds Rạp
    this.cinema.layThongTinRap().subscribe({
      next: (data) => {
        this.heThongRap = data;
        // Lấy DS cụm rạp vs thông số là ma hệ thống rạp ban đầu
        this.layApiCumRap(data[0].maHeThongRap);
      },
    });
  }
  ngOnDestroy(){
    
  }
}
