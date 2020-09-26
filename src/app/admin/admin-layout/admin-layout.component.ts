import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  isShowController: boolean = true;
  currentAdmin:any = {}
  constructor(private router: Router,private auth:AuthenticationService) {}

  showController() {
    this.isShowController = !this.isShowController;
  }
  addClassShow(){
    return (this.isShowController ? "show" : "hide")
  }
  logOut(){
    localStorage.removeItem('adminInfo')
    this.auth.dangXuat('admin');
  }
  ngOnInit(): void {
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
