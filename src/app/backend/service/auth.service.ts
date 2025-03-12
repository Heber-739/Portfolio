import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CRUDLocalService } from './CRUD-Local.service';
import { Observable, Subject } from 'rxjs';
import { JwtDto } from '@backend/interface/jwt-dto';
import { LoginUser } from '@backend/interface/loginUser';
import { NewUser } from '@backend/interface/newUser';
import { environment } from '@environments/environment';
import { Message } from '@interface/Message';
import { ModalService } from '@service/modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged$: Subject<boolean> = new Subject();
  private edithMode$: Subject<boolean> = new Subject();

  authURL: string = `${environment.URL}/auth`;

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private router: Router,
    private local: CRUDLocalService
  ) {}

  public logged$(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }

  public edith$(): Observable<boolean> {
    return this.edithMode$.asObservable();
  }

  public changeEdith(status: boolean) {
    this.edithMode$.next(status);
  }

  public newUser(dataUser: NewUser) {
    this.http.post<Message>(this.authURL + '/generated', dataUser).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
      },
      error: (err) => {
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`);
      },
      complete: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  public loginUser(loginUser: LoginUser): void {
    this.http.post<JwtDto>(this.authURL + '/login', loginUser).subscribe({
      next: (data) => {
        this.local.setUserData(data.username, 'username');
        this.local.setUserData(data.authorities, 'authorities');
        this.local.setUserData(data.token, 'token');
        this.local.setUserData(data.user, 'user');
        this.router.navigate([data.user != null ? '' : 'user']);
      },
      error: (err) => {
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`);
      },
      complete: () => this.isLogged$.next(true),
    });
  }

  logOut() {
    window.sessionStorage.clear();
    this.isLogged$.next(false);
  }
}
