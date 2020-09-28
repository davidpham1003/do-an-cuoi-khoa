import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/Servers/api.service';
import { MoviesService } from 'src/app/core/Servers/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-them-sua-phim',
  templateUrl: './them-sua-phim.component.html',
  styleUrls: ['./them-sua-phim.component.scss'],
})
export class ThemSuaPhimComponent implements OnInit, OnChanges {
  @Input() objectSuaFilm;
  @Output() dsPhim = new EventEmitter();
  @ViewChild('close') btnClose: ElementRef;
  // @ViewChild(QuanLyPhimComponent) update : QuanLyPhimComponent;
  public formFilm: FormGroup;
  fileInput: any;
  isCapNhatPhim;
  isThemPhim: boolean = true;
  button: string;
  header: string;
  HinhAnh: any = 'assets/img/avatar-phim.jpg';
  tenPhim: string;
  constructor(private movies: MoviesService, private api: ApiService) {
    this.formFilm = new FormGroup({
      maPhim: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.pattern(/^\S*$/),
      ]),
      tenPhim: new FormControl(null, Validators.required),
      biDanh: new FormControl(null, Validators.required),
      trailer: new FormControl(null, Validators.required),
      hinhAnh: new FormControl(null),
      moTa: new FormControl(null, Validators.required),
      maNhom: new FormControl('GP05', Validators.required),
      ngayKhoiChieu: new FormControl(null, Validators.required),
      danhGia: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\S*$/),
        Validators.max(10),
      ]),
    });
  }
  setTenPhim(value) {
    this.tenPhim = value;
  }
  updateDsPhim() {
    this.dsPhim.emit();
  }
  onSelectFile(event) {
    // this.fileInput = event.target.files[0];
    // var reader = new FileReader();
    // reader.readAsDataURL(this.fileInput); // read file as data url
    // reader.onload = (event) => {
    //   // // called once readAsDataURL is completed
    //   // console.log(this.url);
    //   this.HinhAnh = event.target.result;
    // };
    // console.log(this.HinhAnh);
    if (event.target.files && event.target.files[0]) {
      this.fileInput = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.fileInput);
      reader.onload = (event) => {
        // // called once readAsDataURL is completed
        // console.log(this.url);
        this.HinhAnh = event.target.result;
      };
      // var frm = new FormData();
      // if (this.objectSuaFilm) {
      //   frm.append('File', this.fileInput, this.fileInput.name);
      //   frm.append('tenphim', this.objectSuaFilm.tenPhim);
      //   frm.append('manhom', 'GP05');
      //   this.movies.uploadHinh(frm).subscribe({
      //     next: (data) => {
      //       console.log('data', data);
      //     },
      //     error: (err) => {
      //       console.log(err);
      //     },
      //   });
      // }
    }
  }
  resetForm() {
    this.HinhAnh = '';
    this.formFilm.reset();
    this.formFilm.patchValue({
      maNhom: 'GP05',
    });
  }
  sweetAlert(text: string, value: string, method: string) {
    if (method == 'success') {
      Swal.fire({
        title: `${text}`,
        text: `${text} ${value} thành công.`,
        icon: 'success',
      }).then((data) => {
        if (text == 'Thêm Phim') {
          Swal.fire({
            title: `Thêm Phim`,
            text: `Tiếp tục thêm phim.`,
            icon: 'question',
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK!',
            cancelButtonText: 'Hủy',
          }).then((result) => {
            if (!result.isConfirmed) {
              this.btnClose.nativeElement.click();
            }
            this.resetForm();
          });
        }
      });
    } else if (method == 'error') {
      Swal.fire({
        title: `${text}  không thành công.`,
        text: `${value}`,
        icon: 'warning',
      });
    }
  }

  addFilm(values) {
    console.log(this.fileInput);
    this.formFilm.markAllAsTouched();
    const phimThem = {
      ...values,
      ngayKhoiChieu:
        values.ngayKhoiChieu.split('-')[2] +
        '/' +
        values.ngayKhoiChieu.split('-')[1] +
        '/' +
        values.ngayKhoiChieu.split('-')[0],
    };
    console.log(phimThem);
    if (this.formFilm.invalid) {
      return;
    }
    const frm = new FormData();
    // for (let key in phimThem) {
    //   frm.append(key, phimThem[key]);
    // }
    // if(this.fileInput){
    //   frm.append('hinhAnh', this.fileInput, this.fileInput.name);
    // }
    if (this.objectSuaFilm) {
      const frm = new FormData();
     
      // frm.append('tenPhim','')
      console.log(this.fileInput);
      if (this.fileInput) {
        phimThem.hinhAnh = null;
        for (let key in phimThem) {
          frm.append(key, phimThem[key]);
        }
        frm.append('hinhAnh', this.fileInput, this.fileInput.name);
        this.api
          .post('QuanLyPhim/CapNhatPhimUpload', frm, { responseType: 'text' })
          .subscribe({
            next: () => {
              this.sweetAlert('Sửa Phim', phimThem.tenPhim, 'success');
              // this.update.capNhatDsPhim()
              this.btnClose.nativeElement.click();
              this.resetForm();
              this.updateDsPhim();
              this.fileInput = null;
            },
            error: (err) => {
              this.sweetAlert('Sửa Phim', err.error, 'error');
            },
          });
      } else {
        this.movies.suaPhim(phimThem).subscribe({
          next: () => {
            this.sweetAlert('Sửa Phim', phimThem.tenPhim, 'success');
            // this.update.capNhatDsPhim()
            this.btnClose.nativeElement.click();
            this.resetForm();
            this.updateDsPhim();
            this.fileInput = null;
          },
          error: (err) => {
            this.sweetAlert('Sửa Phim', err.error, 'error');
          },
        });
      }
    } else {
      for (let key in phimThem) {
        frm.append(key, phimThem[key]);
      }
      frm.append('hinhAnh', this.fileInput, this.fileInput.name);
      console.log(this.fileInput);
      this.api
        .post('/QuanLyPhim/ThemPhimUploadHinh', frm, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.sweetAlert('Thêm Phim', values.tenPhim, 'success');
            this.updateDsPhim();
          },
          error: (err) => {
            this.sweetAlert('Thêm Phim', err.error, 'error');
          },
        });
    }
  }

  ngOnChanges() {
    if (this.objectSuaFilm) {
      this.HinhAnh = this.objectSuaFilm.hinhAnh;
      this.formFilm.setValue({
        maPhim: this.objectSuaFilm.maPhim,
        tenPhim: this.objectSuaFilm.tenPhim,
        biDanh: this.objectSuaFilm.biDanh,
        trailer: this.objectSuaFilm.trailer,
        moTa: this.objectSuaFilm.moTa,
        ngayKhoiChieu: this.objectSuaFilm.ngayKhoiChieu.split('T')[0],
        danhGia: this.objectSuaFilm.danhGia,
        maNhom: this.objectSuaFilm.maNhom,
        hinhAnh: this.objectSuaFilm.hinhAnh,
      });
      this.isThemPhim = false;
      this.button = 'Cập Nhật';
      this.header = 'Cập Nhật Phim';
      console.log(this.isThemPhim);
    } else {
      this.resetForm();
      this.isThemPhim = true;
      this.button = 'Thêm Phim';
      this.header = 'Thêm Phim';
    }
    console.log(this.isThemPhim);
  }

  ngOnInit(): void {
    console.log(this.fileInput);
  }
}
