import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild, HostListener
} from '@angular/core';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { GheService } from 'src/app/core/Servers/ghe.service';
import { UserService } from 'src/app/core/Servers/user.service';
import { ChangeThemeService } from '../../core/Servers/change-theme.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('helloUser') ShowLogOut: ElementRef;
  @Output() ChangeTheme = new EventEmitter();
  @Output() ShowLogin = new EventEmitter();
  active: string;
  url: any;
  isTogggle: boolean = false;
  isInfo: boolean = false;
  isTheme: boolean = true;
  isLogin: boolean = false;
  currentUser: any = {};
  scroll:number = 0
  toggle() {
    // thay đổi button toggle khi ở màn hình nhỏ
    this.isTogggle = !this.isTogggle;
  }
  changeThemes() {
    // button đổi themes
    this.isTheme = !this.isTheme;
    this.data.shareDataIsTheme(this.isTheme);
    this.ChangeTheme.emit(this.isTheme);
  }
  changeActive(value:string) {
    // click vào các nav-item sẽ active 
    this.isInfo=false;
    this.data.shareDataActiveHeader(value);
  }
  showLogin() {
    // ẩn hiện login khi click button đăng nhập
    this.isLogin = !this.isLogin;
    this.ShowLogin.emit(this.isLogin);
  }
  thongTinUser() {
    // click vào nav-item kho phim
    this.isInfo = false; 
    this.ghe.getLichDatVe('thongTin'); 
  }
  logOut() {
    // đăng xuất tài khoản
    localStorage.removeItem('userInfo'); // xóa local storage
    this.auth.dangXuat('taiKhoan'); // cập nhật lại giá trị của current User 
    this.isLogin = false;
  }

  constructor(
    private data: ChangeThemeService,
    private auth: AuthenticationService,
    private user: UserService,
    private ghe: GheService,
  ) {}

  ngOnInit(): void {
    this.data.shareActiveHeader.subscribe(data=>{
      this.active = data
    })
    this.auth.currentUser.subscribe({
      next: (result) => {
        this.currentUser = result;
      },
    });

    this.user.avatarUser.subscribe({
      next: (data) => {
        this.url = data;
      },
    });
  }
}
