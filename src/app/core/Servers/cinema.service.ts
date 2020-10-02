import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  BASE_URL = 'http://movie0706.cybersoft.edu.vn/api';

  constructor(private http: HttpClient,private api:ApiService) {}
  layThongTinRap(): Observable<any> {
    return this.api.get<any>(
      `/QuanLyRap/LayThongTinHeThongRap`
    );
  }
  layThongTinCumRap(maRap: string): Observable<any> {
    return this.api.get<any>(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`
    );
  }
  layLichChieuTheoRap(maRap: string): Observable<any> {
    return this.api.get<any>(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=GP05`
    );
  }
  layLichChieuTheoPhim(maPhim:string): Observable<any>{
    return this.api.get<any>(
      `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    )
  }
}
