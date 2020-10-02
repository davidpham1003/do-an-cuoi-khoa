import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { UserService } from 'src/app/core/Servers/user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  isShowController: boolean;
  currentAdmin: any = {};
  dieuKien: string = 'user';
  avatar: any;
  public currentWindowWidth: number;
  constructor(private router: Router, private auth: AuthenticationService,private admin : UserService) {}
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
    this.isShowController = this.currentWindowWidth > 991 ? true : false;
  }
  setdieuKien(value) {
    this.dieuKien = value;
  }

  showController() {
    this.isShowController = !this.isShowController;
  }
  addClassShow() {
    return this.isShowController ? 'show' : 'hide';
  }
  logOut() {
    localStorage.removeItem('adminInfo');
    this.auth.dangXuat('admin');
  }
  ngOnInit(): void {
    
    this.currentWindowWidth = window.innerWidth;
    this.isShowController = this.currentWindowWidth > 991 ? true : false;
    this.auth.initCurrentAdmin();
    this.auth.currentAdmin.subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate(['/admin']);
        }
        this.currentAdmin = data;
      },
    });
    this.admin.avatarUser.subscribe({
      next:(data)=>{
        this.avatar = data;
        if(this.avatar.taiKhoan == this.currentAdmin.taiKhoan){
          this.avatar = data;
        }else{
          this.avatar = null
        }
      }
    })
    // const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    // if (!adminInfo) {
    //   this.router.navigate(['/admin']);
    // }
  }
}
