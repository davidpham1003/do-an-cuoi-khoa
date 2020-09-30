import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {

  isShowController: boolean;
  currentAdmin:any = {}
  dieuKien:string = 'user';
  public currentWindowWidth:number;
  constructor(private router: Router,private auth:AuthenticationService) {}
  @HostListener('window:resize')
  onResize(){
    this.currentWindowWidth = window.innerWidth
     this.isShowController = this.currentWindowWidth > 991 ? true : false
    console.log(this.isShowController,this.currentWindowWidth)
   
  }
  setdieuKien(value){
    this.dieuKien = value;
  }

  showController() {
    this.isShowController = !this.isShowController;
  }
  addClassShow(){
    return ((this.isShowController ) ? "show" : "hide")
  }
  logOut(){
    localStorage.removeItem('adminInfo')
    this.auth.dangXuat('admin');
  }
  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth
    this.isShowController = this.currentWindowWidth > 991 ? true : false
    this.auth.initCurrentAdmin()
    this.auth.currentAdmin.subscribe({
      next:(data)=>{
        if(!data){
          this.router.navigate(['/admin']);
        }
        this.currentAdmin = data       
        console.log(data)
      }
    })
    // const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    // if (!adminInfo) {
    //   this.router.navigate(['/admin']);
    // }
  }
}
