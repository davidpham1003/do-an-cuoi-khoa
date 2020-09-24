import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GheService {

  constructor(private api: ApiService) { }
  layDanhSachGhe(maLichChieu:number):Observable<any>{
    return this.api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
  }
  datVe(value:any):Observable<any>{
    return this.api.post('QuanLyDatVe/DatVe' ,value, {responseType: 'text'})
  }
}
