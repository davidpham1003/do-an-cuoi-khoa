import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {
  private isTheme = new BehaviorSubject(true)
  shareIsTheme = this.isTheme.asObservable()
  private activeHeader = new BehaviorSubject ('')
  shareActiveHeader = this.activeHeader.asObservable()
  shareDataIsTheme (isTheme){
    this.isTheme.next(isTheme)
  }
  shareDataActiveHeader(data){
    this.activeHeader.next(data)
  }

  constructor() { }
}
