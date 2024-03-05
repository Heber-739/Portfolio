import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataUser } from 'src/app/interface/dataUser';
import { Message } from 'src/app/interface/message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { CRUDLocalService, DATA } from './CRUD-Local.service';

const { username } = DATA;

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
    let ret: DataUser = {} as DataUser;
    this.http.get<DataUser>(this.URL + `/get/${username}`).subscribe({
      next: (res) => {
        this.local.set<DataUser>(res, 'user');
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
        this.local.setUserData(user.username, username);
        this.local.set(res, 'user');
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
          this.local.setUserData(user, 'user');
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
