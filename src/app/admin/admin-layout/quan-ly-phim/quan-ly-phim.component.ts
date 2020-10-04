import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CinemaService } from 'src/app/core/Servers/cinema.service';
import { MoviesService } from 'src/app/core/Servers/movies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quan-ly-phim',
  templateUrl: './quan-ly-phim.component.html',
  styleUrls: ['./quan-ly-phim.component.scss'],
})
export class QuanLyPhimComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('looking') looking:ElementRef;
  displayedColumns: string[] = [
    'action',
    'maPhim',
    'tenPhim',
    'biDanh',
    'trailer',
    'hinhAnh',
    'moTa',
    'maNhom',
    'ngayKhoiChieu',
    'danhGia',
  ];
  objectSuaFilm: any; 
  objectThemLichChieu:any;
  danhSachPhim: any;
  constructor(private cinema: CinemaService, private movies: MoviesService) {}
  sweetAlertXoa(maPhim, tenPhim) {
    Swal.fire({
      title: 'Xóa Phim?',
      text: `Bạn chắc chắn muốn xóa ${tenPhim}`,
      icon: 'warning',
      reverseButtons:true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.movies.xoaPhim(maPhim).subscribe({
          next: () => {
            Swal.fire(
              'Xóa Thành Công!',
              ` ${tenPhim} đã được xóa khỏi danh sách`,
              'success'
            );
            this.capNhatDsPhim();
          },
          error: (err) => {
            Swal.fire('Xóa Không Thành Công', ` ${err.error} `, 'error');
          },
        });
      }
    });
  }
  applyFilter(event: Event) {
    // tìm kiếm phim
    const filterValue = (event.target as HTMLInputElement).value;
    this.danhSachPhim.filter = filterValue.trim().toLowerCase();
  }
  xoaInput(){
    // clear input khi click (x)
    this.looking.nativeElement.value =''
    this.capNhatDsPhim() // cập nhật lại ds Phim
  }
  themPhim() {
    // click thêm phim ==> objectSuaFilm = null
    this.objectSuaFilm = null; 
  }
  xoaPhim(maPhim: number, tenPhim: string) {
    this.sweetAlertXoa(maPhim, tenPhim);
    this.capNhatDsPhim();// cập nhật lại ds Phim
  }
  capNhatPhim(maPhim) {
    let objectPhim = this.danhSachPhim.data.find(
      (filmItem) => maPhim == filmItem.maPhim
    );
    //set giá trị cho ojectSuaPhim theo đk
    this.objectSuaFilm = objectPhim;
    this.objectThemLichChieu = objectPhim;
  }

  capNhatDsPhim() {
    // Cập nhật lại ds Phim
    this.movies.layDanhSachPhim().subscribe({
      next: (data) => {
        this.danhSachPhim = new MatTableDataSource(data.reverse());
        this.danhSachPhim.paginator = this.paginator;
        this.danhSachPhim.sort = this.sort;
      },
    });
  }
  ngOnInit(): void {
    this.capNhatDsPhim();
  }
}
