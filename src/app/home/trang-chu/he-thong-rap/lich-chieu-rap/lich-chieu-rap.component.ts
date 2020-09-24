import {
  Component,
  OnInit,
  Input,
  OnChanges,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { CinemaService } from '../../../../core/Servers/cinema.service';

@Component({
  selector: 'app-lich-chieu-rap',
  templateUrl: './lich-chieu-rap.component.html',
  styleUrls: ['./lich-chieu-rap.component.scss'],
})
export class LichChieuRapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() maRap: string;
  @Input() isTheme:boolean;
  subscription: SubscriptionLike;
  indexActive: number = 0;
  maCumRap: string = '';
  isShowPhim: boolean = false;
  public currentWindowWidth: number;
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }
  showPhim() {
    this.isShowPhim = !this.isShowPhim;
  }
  layMaCupRap(value) {
    this.maCumRap = value;
  }
  changeIndex(index) {
    this.indexActive = index;
  }

  thongTinRap: [] = [];
  constructor(private cinemaService: CinemaService) {}
  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
  }
  ngOnChanges(): void {
    this.subscription = this.cinemaService
      .layThongTinCumRap(this.maRap)
      .subscribe({
        next: (result) => {
          this.thongTinRap = result;
          this.maCumRap = result[0].maCumRap;
          // console.log('getApi',result)
        },
        error: (err) => {
          // console.log(err);
        },
      });
    this.indexActive = 0;
    // console.log(this.maRap)
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
