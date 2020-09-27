import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Movies} from '../models/Movies'
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient,private api:ApiService  ) {}
  layDanhSachPhim(): Observable<Movies[]>{
    return this.http.get<Movies[]>(
      'http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05'
      )
  }
  themPhim(values:any):Observable<any>{
    return this.api.post('QuanLyPhim/ThemPhim',values,{responseType:'text'})
  }
  xoaPhim(maPhim):Observable<any>{
    return this.api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,{responseType:'text'})
  }
  suaPhim(values:any):Observable<any>{
    return this.api.post('QuanLyPhim/CapNhatPhim',values,{responseType:'text'})
  }
  uploadHinh(values):Observable<any>{
    return this.api.post('QuanLyPhim/UploadHinhAnhPhim',values,{responseType: 'text'})
  }
  themHinhPhim(values):Observable<any>{
    return this.api.post('api/QuanLyPhim/ThemPhimUploadHinh',values)
  }
}
