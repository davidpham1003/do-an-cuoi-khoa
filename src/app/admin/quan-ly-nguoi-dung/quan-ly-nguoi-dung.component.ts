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
  @ViewChild('looking') looking : ElementRef;
  displayedColumns: string[] = [
    'action',
    'taiKhoan',
    'matKhau',
    'hoTen',
    'email',
    'SoDt',
    'maLoaiNguoiDung',
  ];
  objectSuaUser:any; // object khi sửa thông tin user
  danhSachNguoiDung: any; //ds người dùng (ngFor)
  errors: string;
  constructor(private user: UserService) {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Dòng comment dùng filter của angular material
    // this.danhSachNguoiDung.filter = filterValue.trim().toLowerCase();
    this.user.timKiemNguoiDung(filterValue).subscribe({
      // Tìm kiếm người dùng
      next:(data)=>{
        if(filterValue.trim() != ''){
          this.danhSachNguoiDung.data = data
        }else{
          this.capNhatDsNguoiDung()
        }       
      }
    })
  }
  xoaInput(){
   this.looking.nativeElement.value = '' //clear input khi click button (x)
    this.capNhatDsNguoiDung() // cập nhật lại ds người dùng 
  }
  themNguoiDung(){
    this.objectSuaUser = null // click thêm người dùng thì objectSuaUser = null
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
            this.capNhatDsNguoiDung() // cập nhật lại ds người dùng 
          },
          error: (err) => {
            Swal.fire('Xóa Không Thành Công', ` ${err.error} `, 'error');
          },
        });
      }
    });
  }

  suaNguoiDung(value){
    // click sửa User
    let userInfo = this.danhSachNguoiDung.data.find(userItem => userItem.taiKhoan == value)
    this.objectSuaUser = userInfo; // gắn objectSuaUser theo điều kiện 
  }
  
  capNhatDsNguoiDung(){
    // PT cập nhật ds người dùng 
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
