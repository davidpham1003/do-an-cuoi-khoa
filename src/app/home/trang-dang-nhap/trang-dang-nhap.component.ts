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
    // router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     console.log('prev:', event.url);
    //     this.previousUrl = event.url;
    //   });
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
        // this.auth.initCurrentUser(result)
        localStorage.setItem('userInfo', JSON.stringify(result));
        // console.log(result.maLoaiNguoiDung)
        // Kiểm tra mã loại người dùng để chuyển trang
        // Đối tượng Router là dùng để chuyển trang trong component
        // if (result.maLoaiNguoiDung === 'KhachHang') {
        //   // this.router.navigate(['/']);
        // } else {
        //   // this.router.navigate(['/admin']);
        // }
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
    // console.log(this.isLogin)
  }
}
