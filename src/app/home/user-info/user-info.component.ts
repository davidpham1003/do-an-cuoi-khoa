import { Component, OnInit } from '@angular/core';
import { ChangeThemeService } from 'src/app/core/Servers/change-theme.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { UserService } from '../../core/Servers/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  page: number = 1;
  thongTinDatVe: any[];
  warning: string;
  isTheme: any;
  method: string = 'thongTin';
  currentUser: any = {};
  public formUpdate: FormGroup;
  public formUpdatePass: FormGroup;
  url: any = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        // // called once readAsDataURL is completed
        // console.log(this.url);
        this.url = event.target.result
        localStorage.setItem(this.currentUser.taiKhoan, JSON.stringify(this.url));
        this.user.updateAvatarUser(this.url);
      };
    }
  }
  constructor(
    private user: UserService,
    private dateTheme: ChangeThemeService,
    private auth: AuthenticationService,
    private router: Router
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
  changeMethod(value) {
    this.method = value;
  }
  capNhatMatKhau(value) {
    this.formUpdatePass.markAllAsTouched();
    if (this.formUpdatePass.invalid) {
      return;
    }
    if (value.matKhau === this.currentUser.matKhau) {
      if (value.matKhau === value.matKhauMoi) {
        this.warning = 'trungMkCu';
      } else if (value.matKhauMoi !== value.xacNhanMk) {
        this.warning = 'saiXacNhan';
      } else {
        this.warning = '';
      }
    } else {
      this.warning = 'saiMkCu';
    }
    if (this.warning == '') {
      const userUpdate = {
        ...this.currentUser,
        matKhau: value.matKhauMoi,
        maLoaiNguoiDung: 'KhachHang',
      };
      this.auth.capNhat(userUpdate).subscribe({
        next: (data) => {
          // console.log('success', data);
        },
      });
      // console.log(userUpdate);
    }
  }
  capNhat(value) {
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
        // console.log('success', data);
      },
    });

    // console.log(value);
  }
  ngOnInit(): void {
    this.user.avatarUser.subscribe({
      next: (data) => {
        this.url = data;
        // console.log(data);
      },
    });
    // console.log(img)
    this.dateTheme.shareIsTheme.subscribe((data) => {
      this.isTheme = data;
    });
    let user: any = {};
    this.auth.currentUser.subscribe({
      next: (data) => {
        user = data;
        if (!user.taiKhoan) {
          this.router.navigate(['/']);
        } else {
          this.user.layThongTinUser(user.taiKhoan).subscribe({
            next: (data) => {
              this.currentUser = data;
              this.thongTinDatVe = data.thongTinDatVe;
              this.formUpdate.setValue({
                hoTen: this.currentUser.hoTen,
                soDt: this.currentUser.soDT,
              });
              // console.log(this.thongTinDatVe.length);
            },
          });
        }
      },
    });
    const img = JSON.parse(localStorage.getItem('avatar'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }
}
