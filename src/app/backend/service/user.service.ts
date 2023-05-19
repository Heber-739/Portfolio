import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataUser } from 'src/app/interface/dataUser';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { CRUDLocalService } from './CRUD-Local.service';

const TOKEN_KEY = 'authToken';
const AUTHORITIES = 'authAuthorities';
const USER = 'userFromDataBase';
const EXIST = 'UserExistDB';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL: string = `${environment.URL}/user`;
  constructor(
    private router: Router,
    private popup: ModalService,
    private http: HttpClient,
    private local: CRUDLocalService
  ) {}

  public getUser(): DataUser {
    let userId = this.local.getUsername();
    let ret: DataUser = {} as DataUser;
    this.http.get<DataUser>(this.URL + `/get/${userId}`).subscribe({
      next: (res) => {
        this.local.set<DataUser>(res, USER);
        ret = res;
      },
      error: (error) =>
        this.popup.showMessage(
          `Ocurrió un error inesperado. Código ${error.status}`
        ),
    });
    return ret;
  }

  public sendUser(user: DataUser) {
    this.http.post<DataUser>(this.URL + `/create`, user).subscribe({
      next: (res) => {
        this.local.setUsername(user.username);
        this.local.set(res, USER);
        this.popup.showMessage('Usuario crceado');
        this.router.navigate(['']);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }
  public updateUser(user: DataUser) {
    this.http
      .put<Message>(this.URL + `/edith/${user.username}`, user)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.set<DataUser>(user, USER);
          this.router.navigate(['']);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
      });
  }
  public deleteUser(id: string) {
    this.http.delete<Message>(this.URL + `/delete/${id}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }
}
