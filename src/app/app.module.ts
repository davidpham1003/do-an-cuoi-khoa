import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import {AuthInterceptor} from './core/interceptors/auth.interceptor'
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import {PipeModule} from './pipe/pipe.module'
import { Routes, RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);
const appRoutes :Routes=[
  {path:'',loadChildren:()=> HomeModule},
  {path:'home',loadChildren:()=> HomeModule},
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    NzButtonModule,
    SidebarModule,
    NzDrawerModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    AdminModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    PipeModule,
    RouterModule.forChild(appRoutes),
    FormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true},
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
