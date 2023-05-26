import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { CRUDLocalService } from './CRUD-Local.service';
import { DATA } from '../../backend/service/CRUD-Local.service';

const { jobs } = DATA;

@Injectable({
  providedIn: 'root',
})
export class JobService {
  URL: string = `${environment.URL}/job`;
  private job$: Subject<Job[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private local: CRUDLocalService
  ) {}

  public subscribeJob() {
    return this.job$.asObservable();
  }
  public changeObservable(job?: Job[]) {
    let res: Job[] = job ?? this.local.get<Job>(KEY);
    this.job$.next(res);
  }

  /* -------------CRUD´s Methods------------- */
  public getAllJob() {
    let ret: Job[] = [];
    this.http.get<Job[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.setAll(res, GET_ALL);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
  }

  public getJobs() {
    let username = this.token.getUsername();
    this.http.get<Job[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => {
        this.local.set(res, KEY);
        this.changeObservable(res);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }
  public createJob(job: Job) {
    let username = this.token.getUsername();
    this.http.post<Job>(this.URL + `/create/${username}`, job).subscribe({
      next: (res) => this.local.add<Job>(res, KEY),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        this.changeObservable();
        this.popup.showMessage('Trabajo agregado');
      },
    });
  }
  public deleteJob(job: Job) {
    let username = this.token.getUsername();
    this.http
      .delete<Message>(this.URL + `/delete/${job.id}/${username}`)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.remove<Job>(job, KEY);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservable(),
      });
  }
  public updateWorkExp(job: Job) {
    let username = this.token.getUsername();
    this.http
      .put<Message>(this.URL + `/update/${job.id}/${username}`, job)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.update<Job>(job, KEY);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservable(),
      });
  }
}
