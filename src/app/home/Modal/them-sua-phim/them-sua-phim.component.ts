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
    // Khai báo form group và thiết lập giá trị
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
  // setTenPhim(value) {
  //   this.tenPhim = value;
  // }
  updateDsPhim() {
    // đẩy giá trị qua component quan ly phim để cập nhật lại danh sách phim
    this.dsPhim.emit();
  }
  onSelectFile(event) {
    // this.fileInput = event.target.files[0];
    // var reader = new FileReader();
    // reader.readAsDataURL(this.fileInput); // read file as data url
    // reader.onload = (event) => {
    //   // // called once readAsDataURL is completed

    //   this.HinhAnh = event.target.result;
    // };

    if (event.target.files && event.target.files[0]) {
      // set file input
      this.fileInput = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.fileInput);
      reader.onload = (event) => {
        // // called once readAsDataURL is completed
        // gán HinhAnh = file input để hiện thị ra giao diện
        this.HinhAnh = event.target.result;
      };
      // var frm = new FormData();
      // if (this.objectSuaFilm) {
      //   frm.append('File', this.fileInput, this.fileInput.name);
      //   frm.append('tenphim', this.objectSuaFilm.tenPhim);
      //   frm.append('manhom', 'GP05');
      //   this.movies.uploadHinh(frm).subscribe({
      //     next: (data) => {

      //     },
      //     error: (err) => {

      //     },
      //   });
      // }
    }
  }
  resetForm() {
    //hàm reset lại form khi thay đổi giữa sửa phim và thêm phim
    this.HinhAnh = '';
    this.formFilm.reset();
    this.formFilm.patchValue({
      maNhom: 'GP05',
    });
  }
  sweetAlert(text: string, value: string, method: string) {
    //sweet alert 2
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
    // Xử lý thêm phim sửa phim
    this.formFilm.markAllAsTouched(); // cho tất cả các input được touched khi submit
    if (this.formFilm.invalid) {
      //Nếu giá trị không hợp lệ thì k submit
      return;
    }
    const phimThem = {
      // tạo object phimthem để edit lại giá trị ngayKhoiChieu đúng định dạng
      ...values,
      ngayKhoiChieu:
        values.ngayKhoiChieu.split('-')[2] +
        '/' +
        values.ngayKhoiChieu.split('-')[1] +
        '/' +
        values.ngayKhoiChieu.split('-')[0],
    };
    const frm = new FormData(); // New formdata để append lên
    if (this.objectSuaFilm) {
      // Nếu Sửa phim -->
      const frm = new FormData();
      if (this.fileInput) {
        phimThem.hinhAnh = this.fileInput;
        //Nếu file Input hình ảnh có giá trị --> append giá trị object phimThem bằng formdata
        for (let key in phimThem) {
          frm.append(key, phimThem[key]);
        }
        // frm.append('hinhAnh', this.fileInput, this.fileInput.name);// Append hình ảnh
        this.api // Gọi api để truyền dữ liêu form data lên
          .post('QuanLyPhim/CapNhatPhimUpload', frm, { responseType: 'text' })
          .subscribe({
            next: () => {
              this.sweetAlert('Sửa Phim', phimThem.tenPhim, 'success');
              // this.update.capNhatDsPhim()
              this.btnClose.nativeElement.click(); // Close modal khi sửa thành công
              this.resetForm(); // reset lại form modal
              this.updateDsPhim(); // đẩy giá trị ra component quản lý phim để update lại ds phim
              this.fileInput = null; // reset giá trị file hình ảnh
            },
            error: (err) => {
              this.sweetAlert('Sửa Phim', err.error, 'error');
            },
          });
      } else {
        //Nếu file Input hình ảnh không có giá trị --> truyền object phimThem lên serve để xử lý
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
         // Ngươc lại nếu click vào thêm phim -->>
      if (this.fileInput) {
        phimThem.hinhAnh = this.fileInput;
        //Nếu file Input hình ảnh có giá trị --> append giá trị object phimThem bằng formdata
        for (let key in phimThem) {
          frm.append(key, phimThem[key]);
        }
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
      }else{
        phimThem.hinhAnh = 'empty.png'
        this.movies.themPhim(phimThem).subscribe({
          next:()=>{
            this.sweetAlert('Thêm Phim', values.tenPhim, 'success');
            this.updateDsPhim();
          },
          error:(err)=>{
             this.sweetAlert('Thêm Phim', err.error, 'error');
          }
        })
      }
    }
  }

  ngOnChanges() {
    if (this.objectSuaFilm) {
      // Set value modal nếu click sửa phim
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
    } else {
      //reset value modal khi click thêm phim
      this.resetForm();
      this.isThemPhim = true;
      this.button = 'Thêm Phim'; //
      this.header = 'Thêm Phim';
    }
  }

  ngOnInit(): void {}
}
