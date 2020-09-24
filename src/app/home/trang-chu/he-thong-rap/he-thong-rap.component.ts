import { Component, OnInit, ViewChild, ElementRef, Input, HostListener, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { CinemaService } from '../../../core/Servers/cinema.service';

@Component({
  selector: 'app-he-thong-rap',

  templateUrl: './he-thong-rap.component.html',
  styleUrls: ['./he-thong-rap.component.scss'],
})
export class HeThongRapComponent implements OnInit,OnDestroy {
  @Input() isTheme;
  subscription: SubscriptionLike;
  dsRap: [] = [];
  maRap: string = '';
  isLogo: boolean;
  isShowRap: boolean = false;
  public currentWindowWidth: number;
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }
  indexActive: number = 0;
  changeIndex(index) {
    this.indexActive = index;
  }
  constructor(private cinemaService: CinemaService) {}
  // showRap(value){
  //   if(value )
  //   this.isShowRap =!this.isShowRap
  // }
  layMaRap(value) {
    this.maRap = value;
    // console.log(this.maRap)
  }
  ngOnInit(): void {
    this.currentWindowWidth = this.currentWindowWidth = window.innerWidth;
    if(this.currentWindowWidth <=420){
      this.maRap = null
    }
    this.subscription = this.cinemaService.layThongTinRap().subscribe({
      next: (result) => {
        this.maRap = result[0].maHeThongRap;
        this.dsRap = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // console.log(this.maRap)
    
  }
  ngOnDestroy(){
    // this.subscription.unsubscribe()
  }
}
