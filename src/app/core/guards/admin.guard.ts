import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree, Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const adminInfo = localStorage.getItem('adminInfo');
      if (adminInfo) {
        const { maLoaiNguoiDung } = JSON.parse(adminInfo);
        if (maLoaiNguoiDung === 'QuanTri') {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      }
      this.router.navigate(['/admin']);
      return false;
  }
}
