import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Education } from 'src/app/Interface/education';
import { Message } from 'src/app/Interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { CRUDLocalService, DATA } from './CRUD-Local.service';

const { username, educations, allEducations } = DATA;

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  URL: string = `${environment.URL}/education`;
  private eds$: Subject<Education[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private local: CRUDLocalService
  ) {}

  public subscribeEds() {
    return this.eds$.asObservable();
  }
  public changeObservable() {
    this.eds$.next(this.local.get<Education[]>(educations));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllEducations(): Education[] {
    let ret: Education[] = [];
    this.http.get<Education[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.set<Education[]>(res, allEducations);
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

  public getEducation(): Education[] {
    let ret: Education[] = [];
    this.http.get<Education[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => {
        this.local.set<Education[]>(res, educations);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N°${err.status}`),
    });
    return ret;
  }
  public createEducation(ed: Education): Education {
    let ret: Education = {} as Education;
    this.http.post<Education>(this.URL + `/create/${username}`, ed).subscribe({
      next: (res) => {
        this.local.add<Education>(res, educations);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\n Error N° ${err.status}`),
      complete: () => this.changeObservable(),
    });
    return ret;
  }
  public deleteEducation(el: Education) {
    this.http
      .delete<Message>(this.URL + `/delete/${el.id}/${username}`)
      .subscribe({
        next: (res) => {
          this.local.remove<Education>(el, educations);
          this.popup.showMessage(res.message);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservable(),
      });
  }
  public updateEducation(ed: Education) {
    this.http.put<Message>(this.URL + `/update/${username}`, ed).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.local.update<Education>(ed, educations);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservable(),
    });
  }
}
