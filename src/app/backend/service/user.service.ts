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

  URL: string = `${environment.URL}/users`;

  constructor(
    private router: Router,
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService
  ) {}

  public subscribeUser() {
    return this.user$.asObservable();
  }
  public changeObservable(user: DataUser) {
    this.token.setUser(user);
    this.user$.next(user);
  }

  public getUser(): void {
    let userId = this.token.getUsername();
    this.http.get<DataUser>(this.URL + `/get/${userId}`).subscribe({
      next: (res) => this.changeObservable(res),
      error: (error) =>
        this.popup.showMessage(
          `Ocurrió un error inesperado. Código ${error.status}`
        ),
      complete: () => this.router.navigate(['']),
    });
  }

  public sendUser(user: DataUser) {
    this.http.post<Message>(this.URL + `/create`, user).subscribe({
      next: (res) => {
        this.token.setUsername(user.username);
        this.popup.showMessage(
          `${res.message}!\nAhora puede completar otros datos como educación y skills más abajo.`
        );
      },
      error: (err) => {
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`);
      },
      complete: () => {
        this.changeObservable(user);
        this.router.navigate(['']);
        window.location.reload();
      },
    });
  }
  public updateUser(user: DataUser) {
    this.http
      .put<Message>(this.URL + `/edith/${user.username}`, user)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => {
          this.changeObservable(user);
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
