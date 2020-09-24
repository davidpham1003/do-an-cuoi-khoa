import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';



@NgModule({
  declarations: [QuanLyNguoiDungComponent, AdminLayoutComponent],
  imports: [
    CommonModule
  ],
  exports:[QuanLyNguoiDungComponent, AdminLayoutComponent]
})
export class AdminModule { }
