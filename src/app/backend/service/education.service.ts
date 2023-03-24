import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Education } from 'src/app/interface/education';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TagService } from './tag.service';
import { TokenService } from './token.service';

const ALL_DB_ED = 'AllEducations';
const LOCAL_ED = 'userEducations';

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
    private tagService: TagService
  ) {}

  public subscribeEds() {
    return this.eds$.asObservable();
  }
  public changeObservable(eds: Education[]) {
    this.eds$.next(eds);
  }

  /* -------------LocalStorage´s Methods------------- */

  public getAllDBEducations(): Education[] {
    return JSON.parse(window.sessionStorage.getItem(ALL_DB_ED) || '[]');
  }
  public setAllDBEducations(eds: Education[]) {
    window.sessionStorage.setItem(ALL_DB_ED, JSON.stringify(eds));
  }

  public getLocalEducations(): Education[] {
    return JSON.parse(window.sessionStorage.getItem(LOCAL_ED) || '[]');
  }

  public setLocalEducations(ed: Education[]) {
    window.sessionStorage.setItem(LOCAL_ED, JSON.stringify(ed));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllEducations() {
    this.http.get<Education[]>(this.URL + '/listAll').subscribe({
      next: (res) => this.setAllDBEducations(res),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () =>
        this.popup.showMessage(
          'Ya puede ver las educaciones existentes en la Base de Datos.'
        ),
    });
  }
  public getOne(id: number): Observable<Education> {
    return this.http.get<Education>(this.URL + `/getOne/${id}`);
  }
  public getEducation() {
    let userId = '/' + this.token.getUsername();
    this.http.get<Education[]>(this.URL + `/list${userId}`).subscribe({
      next: (res) => {
        this.setLocalEducations(res);
        this.changeObservable(res);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N°${err.status}`),
    });
  }
  public createEducation(ed: Education) {
    let userId = this.token.getUsername();
    this.http.post<Message>(this.URL + `/create/${userId}`, ed).subscribe({
      next: (res) => console.log(res),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\n Error N° ${err.status}`),
    });
  }
  public deleteEducation(id: number) {
    let userId = this.token.getUsername();
    this.http.delete<Message>(this.URL + `/delete/${id}/${userId}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        this.getEducation();
        if (this.getLocalEducations().length === 1) {
          window.sessionStorage.removeItem(LOCAL_ED);
          this.changeObservable([]);
        }
      },
    });
  }
  public updateEducation(ed: Education) {
    let username = this.token.getUsername();
    this.http
      .put<Message>(this.URL + `/update/${ed.id}/${username}`, ed)
      .subscribe({
        next: (res) => this.popup.showMessage(res.message),
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.getEducation(),
      });
  }
}
