import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../models/Movies';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  maNhom: string = 'GP05';
  constructor(private http: HttpClient, private api: ApiService) {}
  layDanhSachPhim(): Observable<Movies[]> {
    return this.api.get<Movies[]>('/QuanLyPhim/LayDanhSachPhim?maNhom=GP05');
  }
  // layDanhSachPhimPhanTrang(): Observable<Movies[]> {
  //   return this.api.get(
  //     `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${this.maNhom}&soTrang=1&soPhanTuTrenTrang=8"`
  //   );
  // }
  themPhim(values: any): Observable<any> {
    return this.api.post('QuanLyPhim/ThemPhim', values, {
      responseType: 'text',
    });
  }
  xoaPhim(maPhim): Observable<any> {
    return this.api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`, {
      responseType: 'text',
    });
  }
  suaPhim(values: any): Observable<any> {
    return this.api.post('QuanLyPhim/CapNhatPhim', values, {
      responseType: 'text',
    });
  }
  capNhatPhimUpload(values: any): Observable<any> {
    return this.api.post('QuanLyPhim/CapNhatPhimUpload', values, {
      responseType: 'text',
    });
  }
  uploadHinh(values): Observable<any> {
    return this.api.post('QuanLyPhim/UploadHinhAnhPhim', values, {
      responseType: 'text',
    });
  }
  themHinhPhim(values): Observable<any> {
    return this.api.post('QuanLyPhim/ThemPhimUploadHinh', values, {
      responseType: 'text',
    });
  }
}
