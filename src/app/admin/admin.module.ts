import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminDangNhapComponent } from './admin-dang-nhap/admin-dang-nhap.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuanLyPhimComponent } from './admin-layout/quan-ly-phim/quan-ly-phim.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AdminGuard} from '../core/guards/admin.guard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeModule } from '../home/home.module';
const route: Routes = [
  { path: 'admin', component: AdminDangNhapComponent },
  { path: 'dashboard', component: AdminLayoutComponent,canActivate: [AdminGuard] },
];

@NgModule({
  declarations: [
    QuanLyNguoiDungComponent,
    AdminLayoutComponent,
    AdminDangNhapComponent,
    QuanLyPhimComponent,
  ],
  imports: [
    HomeModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    SweetAlert2Module,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(route),
  ],
  exports: [QuanLyNguoiDungComponent, AdminLayoutComponent],
})
export class AdminModule {}
