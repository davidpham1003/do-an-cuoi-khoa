import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject({})
  private currentAdminSubject = new BehaviorSubject(null)
  currentAdmin = this.currentAdminSubject.asObservable();
  currentUser = this.currentUserSubject.asObservable();
  constructor(private api: ApiService,
    private user : UserService) {}
  
  initCurrentAdmin(){
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
    if(adminInfo){
      this.currentAdminSubject.next(adminInfo)
    }
  }
  
  initCurrentUser() {
    const user = localStorage.getItem('userInfo');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
  dangNhap(values: any): Observable<any> {
    return this.api.post('QuanLyNguoiDung/DangNhap', values).pipe(
      tap((result) => {
        // next để cập nhật giá trị mới
        this.currentUserSubject.next(result);
        this.currentAdminSubject.next(result);
        const avatar = JSON.parse(localStorage.getItem(result.taiKhoan))
        if(avatar){
          this.user.updateAvatarUser(avatar)
        }else{
          this.user.updateAvatarUser(null)
        }  
      })
    );
  }
  dangXuat(value){
    if(value == 'taiKhoan'){
      this.currentUserSubject.next({});
      this.user.updateAvatarUser(null);
    }
    if(value == 'admin'){
      this.currentAdminSubject.next(null);
    }
  }
  dangKy(values: any): Observable<any> {
    return this.api.post('QuanLyNguoiDung/DangKy', {
      ...values,
      maNhom: 'GP05',
    });
  }
  capNhat(values:any):Observable<any>{
    return this.api.put('QuanLyNguoiDung/CapNhatThongTinNguoiDung',values).pipe(
      tap((result)=>{
        this.currentUserSubject.next(result)
      })
    )
  }
}
