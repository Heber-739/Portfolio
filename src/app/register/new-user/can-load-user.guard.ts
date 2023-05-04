import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { TokenService } from 'src/app/backend/service/token.service';

@Injectable({
  providedIn: 'root',
})
export class CanLoadUserGuard implements CanLoad {
  constructor(private router: Router, private token: TokenService) {}
  canLoad(): boolean | UrlTree {
    /* if (!this.token.getToken()) {
      return this.router.parseUrl('/login');
    } else {
      return true;
    } */
    return true;
  }
}
