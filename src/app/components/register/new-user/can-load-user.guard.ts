import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CRUDLocalService } from '@backend/service/CRUD-Local.service';

@Injectable({
  providedIn: 'root',
})
export class CanLoadUserGuard  {
  constructor(private router: Router, private local: CRUDLocalService) {}
  canLoad(): boolean | UrlTree {
    /* if (!this.token.getToken()) {
      return this.router.parseUrl('/login');
    } else {
      return true;
    } */
    return true;
  }
}
