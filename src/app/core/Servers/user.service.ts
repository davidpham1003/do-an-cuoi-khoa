import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}
  private avatarUserSubject = new BehaviorSubject({} as object);
  avatarUser = this.avatarUserSubject.asObservable();
  updateAvatarUser(value) {
    this.avatarUserSubject.next(value);
  }
  initAvatarUser() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let img:any
    if (userInfo) {
      img = JSON.parse(localStorage.getItem(userInfo.taiKhoan));
    }
    if (img) {
      this.avatarUserSubject.next(img);
    } else {
      this.avatarUserSubject.next(null);
    }
  }
  layThongTinUser(values: any): Observable<any> {
    return this.api.post('QuanLyNguoiDung/ThongTinTaiKhoan', {
      taiKhoan: values,
    });
  }
  layDanhSachNguoiDung():Observable<any>{
    return this.api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP05`)
  }
  xoaUser(values:any):Observable<any>{
    return this.api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${values}`,  {responseType: 'text'})
  }
  themUser(values:any):Observable<any>{
    return this.api.post(`QuanLyNguoiDung/ThemNguoiDung`,{...values,maNhom:'GP05'},{responseType: 'text'})
  }
}
