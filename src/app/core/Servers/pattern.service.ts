import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatternService {
  Pattern = {
    email:  '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
    taiKhoan: '^[a-zA-Z0-9_]*$',
    soDt:  '^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$',
    notSpace: '^\S*$',
    number:'^[0-9]*$'
  }
  
  constructor() { }
}
