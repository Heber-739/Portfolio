import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/interface/Message';
import { WorkExp } from 'src/app/interface/workExp';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { CRUDLocalService } from './CRUD-Local.service';

const GET_ALL = 'AllWorksExpDB';
const KEY = 'userWorkExp';

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  URL: string = `${environment.URL}/workExperience`;
  private WeXP$: Subject<WorkExp[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService,
    private local: CRUDLocalService
  ) {}

  public subscribeWExp() {
    return this.WeXP$.asObservable();
  }
  public changeObservable(wExp?: WorkExp[]) {
    let res: WorkExp[] = wExp ? wExp : this.local.get<WorkExp>(KEY);
    this.WeXP$.next(res);
  }

  /* -------------CRUD´s Methods------------- */
  public getAllWorkExp() {
    let ret: WorkExp[] = [];
    this.http.get<WorkExp[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.setAll(res, GET_ALL);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () =>
        this.popup.showMessage(
          'Ya puede ver la lista completa de Skills existentes en la Base de Datos.'
        ),
    });
    return ret;
  }

  public getWorkExp() {
    let username = this.token.getUsername();
    this.http.get<WorkExp[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => {
        this.local.set(res, KEY);
        this.changeObservable(res);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }
  public createWorkExp(wExp: WorkExp) {
    let username = this.token.getUsername();
    this.http.post<WorkExp>(this.URL + `/create/${username}`, wExp).subscribe({
      next: (res) => this.local.add<WorkExp>(res, KEY),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        this.changeObservable();
        this.popup.showMessage('Experiencia agregada');
      },
    });
  }
  public deleteWorkExp(wExp: WorkExp) {
    let username = this.token.getUsername();
    this.http
      .delete<Message>(this.URL + `/delete/${wExp.id}/${username}`)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.remove<WorkExp>(wExp, KEY);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservable(),
      });
  }
  public updateWorkExp(wExp: WorkExp) {
    let username = this.token.getUsername();
    this.http
      .put<Message>(this.URL + `/update/${wExp.id}/${username}`, wExp)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.update<WorkExp>(wExp, KEY);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservable(),
      });
  }
}
