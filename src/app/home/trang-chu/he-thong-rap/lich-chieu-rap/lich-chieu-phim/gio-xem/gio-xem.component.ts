import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Servers/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gio-xem',
  templateUrl: './gio-xem.component.html',
  styleUrls: ['./gio-xem.component.scss']
})
export class GioXemComponent implements OnInit {
  @Input() isTheme;
  @Input() mangGioXem;
  warning:string;
  currentUser: any ={}
  constructor(private router :Router,private auth:AuthenticationService) { }
  datVe(value){
    if(this.currentUser.taiKhoan){
      this.router.navigate([`/datve/${value}`]) // Nếu đã đăng nhập thì router tới trang mua vé
    }else{
      Swal.fire({
        title:"Đăng Nhập!",
        text:"Vui lòng đăng nhập để mua vé",
        icon:'warning'
      })
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
