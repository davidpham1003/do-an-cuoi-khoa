import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
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
  url: any;
  isTogggle:boolean = false
  isInfo: boolean = false;
  isTheme: boolean = true;
  isLogin: boolean = false;
  currentUser: any = {};
  toggle(){
    this.isTogggle = !this.isTogggle
  }
  changeThemes() {
    this.isTheme = !this.isTheme;
    this.data.shareDataIsTheme(this.isTheme);
    this.ChangeTheme.emit(this.isTheme);
  }
  showLogin() {
    this.isLogin = !this.isLogin;
    this.ShowLogin.emit(this.isLogin);
    this.isInfo = false;
  }
  thongTinUser(){
    this.isInfo = false
    this.ghe.getLichDatVe('thongTin')
  }
  UserInfo() {
    this.isInfo = !this.isInfo;
  }
  logOut() {
    localStorage.removeItem('userInfo');
    this.auth.dangXuat('taiKhoan');
    this.isLogin = false;
  }

  constructor(
    private data: ChangeThemeService,
    private auth: AuthenticationService,
    private user: UserService,
    private ghe:GheService,
  ) {}

  ngOnInit(): void {
    // const user = localStorage.getItem('userInfo')
    // this.taiKhoan = JSON.parse(user).taiKhoan
    this.auth.currentUser.subscribe({
      next: (result) => {
        this.currentUser = result;
      },
    });
    // console.log(this.)
    this.user.avatarUser.subscribe({
      next: (data) => {
        this.url=data
      },
    });
  }
}
