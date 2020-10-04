import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';

@Component({
  selector: 'app-admin-dang-nhap',
  templateUrl: './admin-dang-nhap.component.html',
  styleUrls: ['./admin-dang-nhap.component.scss']
})
export class AdminDangNhapComponent implements OnInit {
  public formAdminDn : FormGroup;
  errors:any;
  constructor(private auth: AuthenticationService,
    private router:Router) { 
    this.formAdminDn = new FormGroup({
      taiKhoan : new FormControl(null,Validators.required),
      matKhau : new FormControl(null,Validators.required)
    })
  }

  dangNhap(value){
    this.formAdminDn.markAllAsTouched()
    if(this.formAdminDn.invalid){
      return
    }else{
      this.auth.dangNhap(value).subscribe({
        next:(result) =>{
          if(result.maLoaiNguoiDung == 'KhachHang'){
            this.errors = "Vui lòng nhập tài khoản admin" // tài khoản phải là admin mới vào được dasboard
          }else{
            const adminInfo = JSON.stringify(result);
           localStorage.setItem('adminInfo',adminInfo)
           this.router.navigate(['/dashboard'])
          }
        },
        error:(err)=>{
          this.errors = err.error
        }
      })
    }
  }

  ngOnInit(): void {
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
      this.router.navigate(['/dashboard']) // nếu admin đã đăng nhập thì chuyển tới dashboard
    }
  }

}
