import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { CRUDLocalService, DATA } from './CRUD-Local.service';
import { Job } from 'src/app/interface/job';

const { jobs, allJobs, username } = DATA;

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
  public changeObservable() {
    this.job$.next(this.local.get<Job[]>(jobs));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllJob() {
    let ret: Job[] = [];
    this.http.get<Job[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.set(res, allJobs);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
  }

  public getJobs() {
    this.http.get<Job[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => this.local.set(res, jobs),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservable(),
    });
  }
  public createJob(job: Job) {
    this.http.post<Job>(this.URL + `/create/${username}`, job).subscribe({
      next: (res) => this.local.add<Job>(res, jobs),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        this.changeObservable();
        this.popup.showMessage('Trabajo agregado');
      },
    });
  }
  public deleteJob(job: Job) {
    this.http
      .delete<Message>(this.URL + `/delete/${job.id}/${username}`)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.remove<Job>(job, jobs);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservable(),
      });
  }
  public updateWorkExp(job: Job) {
    this.http
      .put<Message>(this.URL + `/update/${job.id}/${username}`, job)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.update<Job>(job, jobs);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservable(),
      });
  }
}
