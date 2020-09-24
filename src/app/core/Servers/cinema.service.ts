import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  BASE_URL = 'http://movie0706.cybersoft.edu.vn/api';

  constructor(private http: HttpClient) {}
  layThongTinRap(): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/QuanLyRap/LayThongTinHeThongRap`
    );
  }
  layThongTinCumRap(maRap: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`
    );
  }
  layLichChieuTheoRap(maRap: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=GP05`
    );
  }
  layLichChieuTheoPhim(maPhim:string): Observable<any>{
    return this.http.get<any>(
      `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    )
  }
}
