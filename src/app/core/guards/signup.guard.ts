import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TrangDangKyComponent } from 'src/app/home/trang-dang-ky/trang-dang-ky.component';

@Injectable({
  providedIn: 'root',
})
export class SignupGuard implements CanDeactivate<TrangDangKyComponent> {
  canDeactivate(
    component: TrangDangKyComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const isDirty = component.loading;
      if (!isDirty) {
        return window.confirm('Bạn có muốn thoát đăng ký ?');
      }
      return true;
  }
}
