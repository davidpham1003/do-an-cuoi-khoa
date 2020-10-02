import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GheService } from 'src/app/core/Servers/ghe.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  @Input() mangDatVe: any;
  isConfirm: boolean;
  currentHeight:number;
  constructor(private ghe: GheService) {}
  @HostListener('window:resize')
  onResize(){
    this.currentHeight = window.innerHeight
  }
  datVe() {
    this.isConfirm = true;
    if (this.mangDatVe) {
      this.ghe.datVe(this.mangDatVe).subscribe({
        next: (result) => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
      });
    }
  }

  ngOnInit(): void {
    this.currentHeight = window.innerHeight
  }
}
