import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {
  private isTheme = new BehaviorSubject(true)
  shareIsTheme = this.isTheme.asObservable()
  shareDataIsTheme (isTheme){
    this.isTheme.next(isTheme)
  }

  constructor() { }
}
