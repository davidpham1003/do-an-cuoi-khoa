import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
export class ThemSuaLichChieuComponent implements OnInit, OnChanges {
  @Input() objectThemLichChieu;
  formLichChieu: FormGroup;
  heThongRap: any[];
  cumRapChieu: any[];
  maRapTheoCum: any[];

  constructor(private cinema: CinemaService, private ghe: GheService) {
    this.formLichChieu = new FormGroup({
      maPhim: new FormControl(null),
      ngayChieuGioChieu: new FormControl(null, Validators.required),
      maRap: new FormControl(null , Validators.required),
      giaVe: new FormControl('75000', Validators.required),
      
    });
  }

  addLichChieu(value) {
    console.log(value);
    let lichChieu = {
      maRap : parseInt(value.maRap),
      giaVe:parseInt(value.giaVe),
      maPhim:value.maPhim,
      ngayChieuGioChieu:value.ngayChieuGioChieu
        // value.ngayChieuGioChieu.split('-')[2] +
        // '/' +
        // value.ngayChieuGioChieu.split('-')[1] +
        // '/' +
        // value.ngayChieuGioChieu.split('-')[0],
    };
    this.ghe.taoLichChieu(lichChieu).subscribe({
      next: () => {
        Swal.fire({
          title: 'Tạo lịch chiếu!',
          text: 'Tạo lịch chiếu thành công',
          icon: 'success',
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
    this.layApiCumRap(event.target.value);
    console.log(event);
  }
  layMaRap(event) {
    let cumRap = this.cumRapChieu.filter(
      (itemCumRap) => itemCumRap.maCumRap === event.target.value
    );
    this.maRapTheoCum = cumRap[0].danhSachRap;
  }
  layApiCumRap(value) {
    this.cinema.layThongTinCumRap(value).subscribe({
      next: (result) => {
        this.cumRapChieu = result;
        console.log(result);
        this.maRapTheoCum = result[0].danhSachRap;
        this.formLichChieu.patchValue({
          maRap:this.maRapTheoCum[0].maRap
        })
        console.log(this.maRapTheoCum);
      },
    });
  }

  ngOnChanges() {
    if (this.objectThemLichChieu) {
      this.formLichChieu.patchValue({
        maPhim: this.objectThemLichChieu.maPhim,
      });
    }
  }
  ngOnInit(): void {
    this.cinema.layThongTinRap().subscribe({
      next: (data) => {
        this.heThongRap = data;
        this.layApiCumRap(data[0].maHeThongRap);
      },
    });
  }
}
