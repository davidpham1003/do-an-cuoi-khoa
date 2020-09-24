import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Movies} from '../models/Movies'
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient  ) {}
  layDanhSachPhim(): Observable<Movies[]>{
    return this.http.get<Movies[]>(
      'http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05'
      )
  }
}
