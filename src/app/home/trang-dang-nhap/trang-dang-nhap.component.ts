import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/Servers/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-trang-dang-nhap',
  templateUrl: './trang-dang-nhap.component.html',
  styleUrls: ['./trang-dang-nhap.component.scss'],
})
export class TrangDangNhapComponent implements OnInit {
  @Input() isLogin;
  @Output() transUser = new EventEmitter();
  errors: string;
  previousUrl: string;
  constructor(private auth: AuthenticationService, private router: Router) {
    this.formDangNhap = new FormGroup({
      TaiKhoan: new FormControl(null, Validators.required),
      MatKhau: new FormControl(null, Validators.required),
    });
  }
  public formDangNhap: FormGroup;
  hideLoginPopup() {
    this.isLogin = false;
  }
  dangNhap() {
    this.formDangNhap.markAllAsTouched();
    if (this.formDangNhap.invalid) {
      return;
    }
    this.auth.dangNhap(this.formDangNhap.value).subscribe({
      next: (result) => {
        localStorage.setItem('userInfo', JSON.stringify(result)); //Set local storage khi đăng nhập thành công
      },
      error: (err) => {
        this.errors = err;
      },
    });
  }
  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      if (userInfo.maLoaiNguoiDung === 'KhachHang') {
      }
    }
  }
  ngOnChanges() {
  }
}
