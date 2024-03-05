import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/interface/message';
import { SoftSkill } from 'src/app/interface/softSkill';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import {
  CRUDLocalService,
  DATA,
} from '../../backend/service/CRUD-Local.service';

const { username, softs, allSofts } = DATA;

@Injectable({
  providedIn: 'root',
})
export class SoftSkillService {
  URL: string = `${environment.URL}/softSkill`;
  private sSkills$: Subject<SoftSkill[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private local: CRUDLocalService
  ) {}

  public subscribeSs() {
    return this.sSkills$.asObservable();
  }
  public changeObservableSs() {
    this.sSkills$.next(this.local.get<SoftSkill[]>(softs));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllSoftSkill(): SoftSkill[] {
    let ret: SoftSkill[] = [];
    this.http.get<SoftSkill[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.set<SoftSkill[]>(res, allSofts);
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

  public getSoftSkill(): SoftSkill[] {
    let ret: SoftSkill[] = [];
    this.http.get<SoftSkill[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => {
        this.local.set<SoftSkill[]>(res, softs);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservableSs(),
    });
    return ret;
  }

  public createSoftSkill(ss: SoftSkill) {
    this.http.post<SoftSkill>(this.URL + `/create/${username}`, ss).subscribe({
      next: (res) => this.local.add<SoftSkill>(res, softs),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        {
          this.changeObservableSs();
          this.popup.showMessage('Soft Skill creado');
        }
      },
    });
  }
  public deleteSoftSkill(ss: SoftSkill) {
    this.http
      .get<Message>(this.URL + `/remove/${ss.id}/${username}`)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.remove<SoftSkill>(ss, softs);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservableSs(),
      });
  }
  public updateSoftSkill(ss: SoftSkill) {
    this.http.put<Message>(this.URL + `/update/${ss.id}`, ss).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.local.update<SoftSkill>(ss, softs);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservableSs(),
    });
  }
}
