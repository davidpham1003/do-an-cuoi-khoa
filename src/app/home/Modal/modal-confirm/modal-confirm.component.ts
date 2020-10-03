import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GheService } from 'src/app/core/Servers/ghe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  @Input() mangDatVe: any;
  isConfirm: boolean;
  currentHeight: number;
  constructor(private ghe: GheService,private router:Router) {}
  @HostListener('window:resize')
  onResize() {
    this.currentHeight = window.innerHeight;
  }
  datVe() {
    this.isConfirm = true;
    if (this.mangDatVe) {
      this.ghe.datVe(this.mangDatVe).subscribe({
        next: (result) => {
            Swal.fire('', 'Đặt vé thành công!', 'success').then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  text: 'Tiếp tục đặt vé',
                  icon: 'question',
                  showDenyButton: true,
                  confirmButtonText: 'Xác Nhận',
                  denyButtonText: 'Xem lịch sử đặt vé',
                }).then((result)=>{
                  if(result.isConfirmed){
                    location.reload()
                  }else{
                    this.router.navigate(['/thongTin']);
                    
                  }
                });
              }
            });
        },
      });
    }
  }

  ngOnInit(): void {
    this.currentHeight = window.innerHeight;
  }
}
