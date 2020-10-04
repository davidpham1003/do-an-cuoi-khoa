import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
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
export class KhoPhimComponent implements OnInit,OnDestroy {
  @ViewChild('looking') clearFilter: ElementRef;
  isTheme: boolean;
  dsPhim: Movies[] = []; // danh sách phim 
  dsPhimFilter: Movies[] = []; // danh sách phim để chạy ngfor và filter
  p: number = 1; // page ban đầu của ng-pagination
  pageSize: number = 8; // tổng số item trong 1 page
  total: number = this.dsPhim.length; // tổng số lượng item
  currentWidth: number; // chiều rộng hiện tại
  @HostListener('window:resize')
  onResize() { //khi thay đổi chiều rộng (lúc xoay điện thoại và test reponsive)
    this.currentWidth = window.innerWidth;
    if (this.currentWidth < 992) {
      this.pageSize = 6; 
    }else{
      this.pageSize = 8;
    }
  }
  constructor(
    private movies: MoviesService,
    private theme: ChangeThemeService
  ) {}

  filter(event: Event) {
    // Lấy giá trị value từ input ở sự kiện onkeyup
    this.p=1 // chuyển page ban đầu về 1
    const filterValue = (event.target as HTMLInputElement).value;
    let dsPhimFilter: any[] = []; 
    // chạy vòng lặp trong mảng ds phim
    this.dsPhim.forEach((itemPhim) => {
      if (filterValue != '') {
        // Nếu value input có giá trị 
        if (
          // search trong mảng ds phim theo tên phim (bỏ khoảng trống giữa các ký tự, chuyển về viết thường)
          itemPhim.tenPhim
            .trim()
            .replace(/\s/g, '')
            .toLowerCase()
            .search(filterValue.trim().replace(/\s/g, '').toLowerCase()) != -1
        ) {
          // nếu có giá trị thì đẩy item phim vào mảng ds phimfilter được tạo trong hàm
          dsPhimFilter.push(itemPhim);
        }
        // Hoàn thành thì cho dsPhimFilter tạo ở component = dsPhimFilter vừa được khởi tạo
        this.dsPhimFilter = dsPhimFilter;
      } else {
        //Nếu input không có giá trị cho dsPhimFilter = với dsPhim ban đầu
        this.dsPhimFilter = this.dsPhim;
      }
    });
  }
  clearInput() {
    // Khi click vào button (x) trong tìm kiếm thì
    this.clearFilter.nativeElement.value = ''; // clear giá trị input
    this.dsPhimFilter = this.dsPhim; // gán dsPhimFilter bằng dsPhim ban đầu
  }
  ngOnInit(): void {
    this.theme.shareDataActiveHeader('khoPhim') // để active nav-item kho phim ở header
    this.currentWidth = window.innerWidth;
    if (this.currentWidth < 992) {
      this.pageSize = 6;
    }else{
      this.pageSize = 8;
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
  ngOnDestroy(){
    this.theme.shareDataActiveHeader('')
  }
}
