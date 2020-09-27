import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/core/Servers/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.scss'],
})
export class QuanLyNguoiDungComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'action',
    'taiKhoan',
    'matKhau',
    'hoTen',
    'email',
    'SoDt',
    'maLoaiNguoiDung',
  ];
  objectSuaUser:any
  danhSachNguoiDung: any;
  errors: string;
  constructor(private user: UserService) {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.danhSachNguoiDung.filter = filterValue.trim().toLowerCase();
    console.log((event.target as HTMLInputElement).value)
  }
  themNguoiDung(){
    this.objectSuaUser = null
  }
  xoaNguoiDung(value) {
    Swal.fire({
      title: 'Xóa Người Dùng?',
      text: `Bạn chắc chắn muốn xóa ${value}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.xoaUser(value).subscribe({
          next: () => {
            Swal.fire(
              'Xóa Thành Công!',
              ` ${value} đã được xóa khỏi danh sách`,
              'success'
            );
            this.capNhatDsNguoiDung()
          },
          error: (err) => {
            Swal.fire('Xóa Không Thành Công', ` ${err.error} `, 'error');
          },
        });
      }
    });
  }

  suaNguoiDung(value){
    let userInfo = this.danhSachNguoiDung.data.find(userItem => userItem.taiKhoan == value)
    this.objectSuaUser = userInfo;
    console.log(this.objectSuaUser)
  }
  public saveEmail(email: string): void {
    // ... save user email
  }

  public handleRefusalToSetEmail(dismissMethod: string): void {
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

  
  capNhatDsNguoiDung(){
    this.user.layDanhSachNguoiDung().subscribe({
      next: (data) => {
        this.danhSachNguoiDung = new MatTableDataSource(data.reverse());
        this.danhSachNguoiDung.sort = this.sort;
        this.danhSachNguoiDung.paginator = this.paginator;
      },
      error: (err) => {
        this.errors = err.error;
      },
    });
  }

  ngOnInit(): void {
    this.capNhatDsNguoiDung()

  }
  ngAfterViewInit() {}
}
