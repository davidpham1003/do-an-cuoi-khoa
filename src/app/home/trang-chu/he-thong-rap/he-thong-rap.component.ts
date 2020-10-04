import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { CinemaService } from '../../../core/Servers/cinema.service';

@Component({
  selector: 'app-he-thong-rap',
  // animations: [
  //   trigger('fadeIn', [
  //     transition(':enter', [
  //       style({ opacity: '0' }),
  //       animate('.5s ease-out', style({ opacity: '1' })),
  //     ]),
  //   ]),
  // ],
  templateUrl: './he-thong-rap.component.html',
  styleUrls: ['./he-thong-rap.component.scss'],
})
export class HeThongRapComponent implements OnInit,OnDestroy {
  @Input() isTheme;
  subscription: SubscriptionLike;
  dsRap: [] = []; // Ds rạp hiển thị giao diện (ngFor)
  maRap: string = '';
  public currentWindowWidth: number;
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }
  indexActive: number = 0;
  changeIndex(index) {
    // Thay đổi logo rạp active
    this.indexActive = index;
  }
  constructor(private cinemaService: CinemaService) {}

  layMaRap(value) {
    this.maRap = value;
  };
  ngOnInit(): void {
    this.currentWindowWidth = this.currentWindowWidth = window.innerWidth;
    if(this.currentWindowWidth <=420){
      this.maRap = null 
    }
    this.subscription = this.cinemaService.layThongTinRap().subscribe({
      next: (result) => {
        this.maRap = result[0].maHeThongRap; // set mã rạp ban đầu
        this.dsRap = result;
      },
      error: () => {
      },
    });
  };
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
