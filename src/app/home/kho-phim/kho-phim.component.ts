import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Movies } from 'src/app/core/models/Movies';
import { ChangeThemeService } from 'src/app/core/Servers/change-theme.service';
import { MoviesService } from 'src/app/core/Servers/movies.service';

@Component({
  selector: 'app-kho-phim',
  templateUrl: './kho-phim.component.html',
  styleUrls: ['./kho-phim.component.scss'],
})
export class KhoPhimComponent implements OnInit {
  @ViewChild('looking') clearFilter: ElementRef;
  isTheme: boolean;
  dsPhim: Movies[] = [];
  dsPhimFilter: Movies[] = [];
  p: number = 1;
  pageSize: number = 8;
  total: number = this.dsPhim.length;
  currentWidth: number;
  @HostListener('window:resize')
  onResize() {
    this.currentWidth = window.innerWidth;
    if (this.currentWidth < 992) {
      this.pageSize = 6;
    }
  }
  constructor(
    private movies: MoviesService,
    private theme: ChangeThemeService
  ) {}

  filter(event: Event) {
    // Lấy giá trị value từ input ở sự kiện onkeyup
    const filterValue = (event.target as HTMLInputElement).value;
    let dsPhimFilter: any[] = [];
    // chạy vòng lặp trong mảng ds phim
    this.dsPhim.forEach((itemPhim) => {
      if (filterValue != '') {
        // Nếu value input có giá trị
        if (
          // search trong mảng ds phim theo tên phim
          itemPhim.tenPhim
            .trim()
            .replace(/\s/g, '')
            .toLowerCase()
            .search(filterValue.trim().replace(/\s/g, '').toLowerCase()) != -1
        ) {
          // nếu có giá trị thì đẩy item phim vào mảng ds phimfilter
          dsPhimFilter.push(itemPhim);
        }
        // cho dsPhimfilter = với mảng phim vừa được push vào
        this.dsPhimFilter = dsPhimFilter;
      } else {
        //Nếu input không có giá trị thì trả lại giá trị ban đầu
        this.dsPhimFilter = this.dsPhim;
      }
    });
  }
  clearInput() {
    this.clearFilter.nativeElement.value = '';
    this.dsPhimFilter = this.dsPhim;
  }
  ngOnInit(): void {
    this.currentWidth = window.innerWidth;
    if (this.currentWidth < 992) {
      this.pageSize = 6;
    }
    this.theme.shareIsTheme.subscribe((data) => {
      this.isTheme = data;
    });
    this.movies.layDanhSachPhim().subscribe({
      next: (data) => {
        this.dsPhim = data;
        this.dsPhimFilter = data;
      },
    });
  }
}
