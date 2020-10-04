import { Component, OnInit } from '@angular/core';
import { ChangeThemeService } from 'src/app/core/Servers/change-theme.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { UserService } from '../../core/Servers/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GheService } from 'src/app/core/Servers/ghe.service';

@Component({
  selector: 'app-user-info',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0s', style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  page: number = 1; // page ban đầu ng-pagination
  thongTinDatVe: any[]; // mảng thông tin đặt vé 
  warning: string; // warning validation đổi pass
  isTheme: any;
  method: any = 'thongTin'; // active item 'Thông tin tài khoản' hoặc 'đổi mật khẩu' hoặc 'thông tin đặt vé'
  currentUser: any = {}; // tài khoản đăng nhập
  isShowPassCu:boolean = false; // Show pass cũ (trong đổi pass)
  isShowPassMoi:boolean = false; // Show pass mới (trong đổi pass)
  isShowPassConfirm:boolean = false;// Show pass xác nhận mới (trong đổi pass)
  public formUpdate: FormGroup;
  public formUpdatePass: FormGroup;
  url: any; // hình ảnh avatar
  constructor(
    private user: UserService,
    private dateTheme: ChangeThemeService,
    private auth: AuthenticationService,
    private router: Router,
    private ghe:GheService,
  ) {
    this.formUpdate = new FormGroup({
      hoTen: new FormControl(null, Validators.required),
      soDt: new FormControl(null, Validators.required),
    });
    this.formUpdatePass = new FormGroup({
      matKhau: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      matKhauMoi: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      xacNhanMk: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        // // called once readAsDataURL is completed
        // thay đổi avatar
        this.url = event.target.result 
        const imgUser = {taiKhoan : this.currentUser.taiKhoan, img:this.url}
        localStorage.setItem(this.currentUser.taiKhoan, JSON.stringify(imgUser));
        this.user.updateAvatarUser(imgUser);
      };
    }
  }
  changeMethod(value) {
    // thay đổi active giữa 'Thông tin tài khoản' hoặc 'đổi mật khẩu' hoặc 'thông tin đặt vé'
    this.method = value;
  }
  capNhatMatKhau(value) {
    this.formUpdatePass.markAllAsTouched();
    if (this.formUpdatePass.invalid) {
      return;
    }
    //validation
    if (value.matKhau === this.currentUser.matKhau) {  
      if (value.matKhau === value.matKhauMoi) {
        this.warning = 'trungMkCu'; // MK mới không được trùng MK cũ
      } else if (value.matKhauMoi !== value.xacNhanMk) {
        this.warning = 'saiXacNhan'; // Xác nhận mk mới không chính xác
      } else {
        this.warning = '';
      }
    } else {
      this.warning = 'saiMkCu'; // Nhập không chính xác mk cũ
    }
    if (this.warning == '') { 
      const userUpdate = {
        ...this.currentUser,
        matKhau: value.matKhauMoi,
        maLoaiNguoiDung: 'KhachHang',
      };
      this.auth.capNhat(userUpdate).subscribe({
        next: (data) => {
          Swal.fire('','Cập nhật mật khẩu thành công','success')
          this.formUpdatePass.reset() //reset lại value của MK khi đổi mk thành công
        },
        error:(err)=>{
          Swal.fire('',`${err.error}`,'warning')
        }
      });
      
    }
  }
  capNhat(value) {
    // Cập nhật thông tin (chỉ cập nhật được họ tên và SĐT)
    this.formUpdate.markAllAsTouched();
    if (this.formUpdate.invalid) {
      return;
    }
    const userUpdate = {
      ...this.currentUser,
      hoTen: value.hoTen,
      soDT: value.soDt,
      matKhau: this.currentUser.matKhau,
      maLoaiNguoiDung: 'KhachHang',
    };
    this.auth.capNhat(userUpdate).subscribe({
      next: (data) => {
        Swal.fire('','Cập nhật thông tin thành công','success')
      },
      error:(err)=>{
        Swal.fire('',`${err.error}`,'warning')
      }
    });


  }
  ngOnInit(): void {
    this.user.avatarUser.subscribe({
      //Set hình ảnh từ service 
      next: (data) => {
        this.url = data;
      },
    });
    this.ghe.lichDatVe.subscribe(data=>{
      //set method ban đầu khi sang component thông tin. nếu từ trang đặt vé sang thì 'thông tin vé' sẽ được active
      if(data){
        this.method = data
      }else{
        this.method = 'thongTin' // nếu không 'thông tin' sẽ được active
      }
    })
    this.dateTheme.shareIsTheme.subscribe((data) => {
      this.isTheme = data;
    });
    let user: any = {};
    this.auth.currentUser.subscribe({
      next: (data) => {
        user = data;
        if (!user.taiKhoan) {
          this.router.navigate(['/']); // khi đăng xuất sẽ về lại trang chủ
        } else {
          this.user.layThongTinUser(user.taiKhoan).subscribe({
            next: (data) => {
              this.currentUser = data;
              this.thongTinDatVe = data.thongTinDatVe;
              this.formUpdate.setValue({
                hoTen: this.currentUser.hoTen,
                soDt: this.currentUser.soDT,
              });

            },
          });
        }
      },
    });
  }
}
