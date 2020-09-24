import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';

@Component({
  selector: 'app-gio-xem',
  templateUrl: './gio-xem.component.html',
  styleUrls: ['./gio-xem.component.scss']
})
export class GioXemComponent implements OnInit {
  @Input() isTheme;
  @Input() mangGioXem;
  currentUser: any ={}
  constructor(private router :Router,private auth:AuthenticationService) { }
  datVe(value){
    if(this.currentUser.taiKhoan){
      this.router.navigate([`/datve/${value}`])
    }
  }
  ngOnInit(): void {
    this.auth.currentUser.subscribe({
      next: (result) => {
        this.currentUser = result;
      },
    });
  }
}
