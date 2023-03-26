import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Education } from 'src/app/interface/education';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { CRUDLocalService } from './CRUD-Local.service';

const GET_ALL = 'AllEducations';
const KEY = 'userEducations';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  URL: string = `${environment.URL}/education`;
  private eds$: Subject<Education[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService,
    private local: CRUDLocalService
  ) {}

  public subscribeEds() {
    return this.eds$.asObservable();
  }
  public changeObservable(edsGet?: Education[]) {
    let eds = edsGet ? edsGet : this.local.get<Education>(KEY);
    this.eds$.next(eds);
  }

  /* -------------CRUD´s Methods------------- */
  public getAllEducations(): Education[] {
    let ret: Education[] = [];
    this.http.get<Education[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.setAll<Education>(res, GET_ALL);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () =>
        this.popup.showMessage(
          'Ya puede ver las educaciones existentes en la Base de Datos.'
        ),
    });
    return ret;
  }

  public getEducation() {
    let userId = '/' + this.token.getUsername();
    this.http.get<Education[]>(this.URL + `/list${userId}`).subscribe({
      next: (res) => {
        this.local.set<Education>(res, KEY);
        this.changeObservable(res);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N°${err.status}`),
    });
  }
  public createEducation(ed: Education): number {
    let userId: string = this.token.getUsername();
    let response: number = 0;
    this.http.post<Education>(this.URL + `/create/${userId}`, ed).subscribe({
      next: (res) => {
        response = res.id!;
        this.local.add<Education>(res, KEY);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\n Error N° ${err.status}`),
      complete: () => this.changeObservable(),
    });
    return response;
  }
  public deleteEducation(el: Education) {
    let userId = this.token.getUsername();
    this.http
      .delete<Message>(this.URL + `/delete/${el.id}/${userId}`)
      .subscribe({
        next: (res) => {
          this.local.remove<Education>(el, KEY);
          this.popup.showMessage(res.message);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => {
          this.changeObservable();
        },
      });
  }
  public updateEducation(ed: Education) {
    let username = this.token.getUsername();
    this.http
      .put<Message>(this.URL + `/update/${ed.id}/${username}`, ed)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.update<Education>(ed, KEY);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservable(),
      });
  }
}
