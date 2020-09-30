import { Component, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import { UserService } from 'src/app/core/Servers/user.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  isTheme:boolean = true
  // isToTop:boolean;
  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //   const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   this.isToTop = offset > 300 ? true : false
  //   console.log(offset, this.isToTop)
  // }
  changeTheme(value) {
    this.isTheme = value;
  }

  constructor(private auth:AuthenticationService,private user : UserService) { }

  ngOnInit(): void {
    this.auth.initCurrentUser()
    this.user.initAvatarUser()
  }

}
