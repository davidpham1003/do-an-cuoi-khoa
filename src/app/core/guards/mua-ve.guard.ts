import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TrangDatVeComponent } from 'src/app/home/trang-dat-ve/trang-dat-ve.component';

@Injectable({
  providedIn: 'root',
})
export class MuaVeGuard implements CanDeactivate<TrangDatVeComponent> {
  canDeactivate(
    component: TrangDatVeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean

    | UrlTree {
      const gheDangChon = component.gheDangChon
      if(gheDangChon.length > 0){
        return window.confirm('Bạn có muốn thoát trang mua vé ?');
      }
    return true;
  }
}
