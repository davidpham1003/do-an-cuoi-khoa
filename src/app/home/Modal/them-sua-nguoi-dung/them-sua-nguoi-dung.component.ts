import { error } from '@angular/compiler/src/util';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { UserService } from 'src/app/core/Servers/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-them-sua-nguoi-dung',
  templateUrl: './them-sua-nguoi-dung.component.html',
  styleUrls: ['./them-sua-nguoi-dung.component.scss'],
})
export class ThemSuaNguoiDungComponent implements OnInit, OnChanges {
  public formUser: FormGroup;
  @Input() methodUser: string;
  @Input() objectSuaUser: any;
  isThemNguoiDung: boolean;
  button: string = '';
  header: string;
  sweetAlert(text: string, value:string,method:string) {
    if (method == 'success') {
      Swal.fire({
        title: `${text}`,
        text: `${text} ${value} thành công`,
        icon: 'success',
      });
    }else if(method =='error'){
      Swal.fire({
        title: `${text}  không thành công`,
        text: `${value}`,
        icon: 'warning',
      });
    }
  }
  
  constructor(private user: UserService, private auth: AuthenticationService) {
    this.formUser = new FormGroup({
      taiKhoan: new FormControl({ value: '' }, [
        Validators.required,
        Validators.pattern(/^\S*$/),
        
      ]),
      matKhau: new FormControl(null, Validators.required),
      hoTen: new FormControl(null, Validators.required),
      soDt: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$'
        ),
      ]),
      maLoaiNguoiDung: new FormControl(null, Validators.required),
    });
  }
  addUser(value) {
    this.formUser.markAllAsTouched();
    if (this.formUser.invalid) {
      return;
    }
    if (this.objectSuaUser) {
      const updateUser = {...value,maNhom:'GP05'}
      this.auth.capNhat(updateUser).subscribe({
        next: () => {
          this.sweetAlert('Cập Nhật', value.taiKhoan,'success');
        },
        error: (err) => {
          this.sweetAlert('Cập Nhật', err.error,'error');
        },
      });
      console.log(value)
    } else {
      this.user.themUser(value).subscribe({
        next: () => {
          this.sweetAlert('Thêm Người Dùng', value.taiKhoan,'success');
          this.formUser.setValue({
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            email: '',
            maLoaiNguoiDung: 'KhachHang',
            soDt: '',
          });
        },
        error: (err) => {
          this.sweetAlert('Thêm', value.taiKhoan,'error');
        },
      });
    }
  }
  ngOnChanges() {
    if (this.objectSuaUser) {
      this.formUser.setValue({
        taiKhoan: this.objectSuaUser.taiKhoan,
        matKhau: this.objectSuaUser.matKhau,
        hoTen: this.objectSuaUser.hoTen,
        email: this.objectSuaUser.email,
        maLoaiNguoiDung: this.objectSuaUser.maLoaiNguoiDung,
        soDt: this.objectSuaUser.soDt,
      });
      this.formUser.controls['taiKhoan'].disabled;
      this.isThemNguoiDung = false;
      this.button = 'Cập Nhật';
      this.header = 'Cập Nhật Người Dùng';
      console.log(this.isThemNguoiDung);
    } else {
      this.formUser.setValue({
        taiKhoan: '',
        matKhau: '',
        hoTen: '',
        email: '',
        maLoaiNguoiDung: 'KhachHang',
        soDt: '',
      });
      this.isThemNguoiDung = true;
      this.button = 'Thêm Người Dùng';
      this.header = 'Thêm Người Dùng';
    }
    console.log(this.isThemNguoiDung);
  }
  ngOnInit(): void {}
}
