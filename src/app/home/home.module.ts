import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { TrangChiTietComponent } from './trang-chi-tiet/trang-chi-tiet.component';
import { FooterComponent } from './footer/footer.component';
import { TrangDatVeComponent } from './trang-dat-ve/trang-dat-ve.component';
import { TrangDangKyComponent } from './trang-dang-ky/trang-dang-ky.component';
import { TrangDangNhapComponent } from './trang-dang-nhap/trang-dang-nhap.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './trang-chu/slider/slider.component';
import { PhimComponent } from './trang-chu/phim/phim.component';
import { TinTucComponent } from './trang-chu/tin-tuc/tin-tuc.component';
import { UngDungComponent } from './trang-chu/ung-dung/ung-dung.component';
import { HeaderComponent } from './header/header.component';
import { MuaVeComponent } from './trang-chu/mua-ve/mua-ve.component';
import { PhimDangChieuComponent } from './trang-chu/phim/phim-dang-chieu/phim-dang-chieu.component';
import { HeThongRapComponent } from './trang-chu/he-thong-rap/he-thong-rap.component';
import { LichChieuRapComponent } from './trang-chu/he-thong-rap/lich-chieu-rap/lich-chieu-rap.component';
import { LichChieuPhimComponent } from './trang-chu/he-thong-rap/lich-chieu-rap/lich-chieu-phim/lich-chieu-phim.component';
import { PhimSapChieuComponent } from './trang-chu/phim/phim-sap-chieu/phim-sap-chieu.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PhimItemComponent } from './trang-chu/phim/phim-item/phim-item.component';
import { GioXemComponent } from './trang-chu/he-thong-rap/lich-chieu-rap/lich-chieu-phim/gio-xem/gio-xem.component';
import { PipeModule } from '../pipe/pipe.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { DanhGIaComponent } from './trang-chu/phim/phim-item/danh-gia/danh-gia.component';
import { ModalYoutubeComponent } from './Modal/modal-youtube/modal-youtube.component';
import { Routes, RouterModule } from '@angular/router';
import { ChiTietRapComponent } from './trang-chi-tiet/chi-tiet-rap/chi-tiet-rap.component';
import { ChiTietInfoComponent } from './trang-chi-tiet/chi-tiet-info/chi-tiet-info.component';
import { ChiTietRateComponent } from './trang-chi-tiet/chi-tiet-rate/chi-tiet-rate.component';
import { DanhSachGheComponent } from './trang-dat-ve/danh-sach-ghe/danh-sach-ghe.component';
import { GheItemComponent } from './trang-dat-ve/danh-sach-ghe/ghe-item/ghe-item.component';
import { PopupComboComponent } from './Modal/popup-combo/popup-combo.component';
import { ModalConfirmComponent } from './Modal/modal-confirm/modal-confirm.component';
import { ModalWarningComponent } from './Modal/modal-warning/modal-warning.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CountdownModule } from 'ngx-countdown';
import { ModalModule } from 'ngb-modal';
import { SidebarModule } from 'ng-sidebar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import {SignupGuard} from '../core/guards/signup.guard';
import {MuaVeGuard} from '../core/guards/mua-ve.guard'
import { UserInfoComponent } from './user-info/user-info.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { ThemSuaNguoiDungComponent } from './Modal/them-sua-nguoi-dung/them-sua-nguoi-dung.component'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ThemSuaPhimComponent } from './Modal/them-sua-phim/them-sua-phim.component';
import { ThemSuaLichChieuComponent } from './Modal/them-sua-lich-chieu/them-sua-lich-chieu.component';
import { SpinnerBackgroundComponent } from './spinner/spinner-background/spinner-background.component';
import { ToTopComponent } from './to-top/to-top.component';
import { ThaTimComponent } from './spinner/tha-tim/tha-tim.component';
import { KhoPhimComponent } from './kho-phim/kho-phim.component';


const route: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: TrangChuComponent },
      { path: 'chitiet/:maPhim', component: TrangChiTietComponent },
      { path: 'dangky', component: TrangDangKyComponent,canDeactivate: [SignupGuard] },
      { path: 'datve/:maLichChieu', component: TrangDatVeComponent,canDeactivate: [MuaVeGuard]  },
      { path: 'thongTin', component: UserInfoComponent },
      {path:'khoPhim',component:KhoPhimComponent},
    ],
  },
];
@NgModule({
  declarations: [
    HomeLayoutComponent,
    TrangChuComponent,
    TrangChiTietComponent,
    FooterComponent,
    TrangDatVeComponent,
    TrangDangKyComponent,
    TrangDangNhapComponent,
    SliderComponent,
    PhimComponent,
    TinTucComponent,
    UngDungComponent,
    HeaderComponent,
    MuaVeComponent,
    PhimDangChieuComponent,
    HeThongRapComponent,
    LichChieuRapComponent,
    LichChieuPhimComponent,
    PhimSapChieuComponent,
    PhimItemComponent,
    GioXemComponent,
    DanhGIaComponent,
    ModalYoutubeComponent,
    ChiTietRapComponent,
    ChiTietInfoComponent,
    ChiTietRateComponent,
    DanhSachGheComponent,
    GheItemComponent,
    PopupComboComponent,
    ModalConfirmComponent,
    ModalWarningComponent,
    SpinnerComponent,
    UserInfoComponent,
    ThemSuaNguoiDungComponent,
    ThemSuaPhimComponent,
    ThemSuaLichChieuComponent,
    SpinnerBackgroundComponent,
    ToTopComponent,
    ThaTimComponent,
    KhoPhimComponent,

  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ModalModule,
    SweetAlert2Module,
    NzButtonModule,
    NzDrawerModule,
    SidebarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    SlickCarouselModule,
    NgxPageScrollModule,
    CountdownModule,
    NgxPageScrollCoreModule.forRoot({duration: 500}),
    NgCircleProgressModule.forRoot({
      "showSubtitle": false,
      "showUnits": false,
      "space": 0,
      "maxPercent":100,
      "backgroundColor": "#33333391",
      "titleColor": "#ffffff"  ,
      "showTitle": false,   
      "animationDuration": 5000,
      "startFromZero": true
    }),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    PipeModule,
    RouterModule.forChild(route),
  ],
  exports:[ThemSuaNguoiDungComponent,SpinnerComponent,ThemSuaPhimComponent,ThemSuaLichChieuComponent]
})

export class HomeModule {}
