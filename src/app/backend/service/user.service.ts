import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataUser } from 'src/app/interface/dataUser';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: Subject<DataUser> = new Subject();
  URL: string = `${environment.URL}/user`;
  constructor(
    private router: Router,
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService
  ) {}

  public subscribeUser() {
    return this.user$.asObservable();
  }
  public changeObservable() {
    let user = this.token.getUser();
    this.user$.next(user);
  }

  public getUser(): DataUser {
    let userId = this.token.getUsername();
    let ret: DataUser = {} as DataUser;
    this.http.get<DataUser>(this.URL + `/get/${userId}`).subscribe({
      next: (res) => {
        this.token.setUser(res);
        ret = res;
        console.log(res);
      },
      error: (error) =>
        this.popup.showMessage(
          `Ocurrió un error inesperado. Código ${error.status}`
        ),
      complete: () => this.changeObservable(),
    });
    return ret;
  }

  public sendUser(user: DataUser) {
    this.http.post<DataUser>(this.URL + `/create`, user).subscribe({
      next: (res) => {
        this.token.setUsername(user.username);
        this.token.setUser(res);
        this.popup.showMessage(`Usuario crceado!`);
      },
      error: (err) => {
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`);
      },
      complete: () => {
        this.changeObservable();
        this.router.navigate(['']);
      },
    });
  }
  public updateUser(user: DataUser) {
    this.http
      .put<Message>(this.URL + `/edith/${user.username}`, user)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.token.setUser(user);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => {
          this.changeObservable();
          this.router.navigate(['']);
        },
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
