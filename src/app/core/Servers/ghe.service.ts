import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GheService {
  private lichDatVeSubject = new BehaviorSubject('');
  lichDatVe = this.lichDatVeSubject.asObservable();
  getLichDatVe(value){
    this.lichDatVeSubject.next(value)
  }
  constructor(private api: ApiService) { }
  layDanhSachGhe(maLichChieu:number):Observable<any>{
    return this.api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
  }
  datVe(value:any):Observable<any>{
    return this.api.post('QuanLyDatVe/DatVe' ,value, {responseType: 'text'})
  }
  taoLichChieu(value:any):Observable<any>{
    return this.api.post('QuanLyDatVe/TaoLichChieu',value,{responseType: 'text'})
  }
}
