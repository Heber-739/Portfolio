import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from 'src/app/interface/Message';
import { Tag } from 'src/app/interface/tag';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { CRUDLocalService } from './CRUD-Local.service';

const GET_ALL = 'getAllTagsFromDB';
const KEY = 'getAllLocalTags';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  URL: string = `${environment.URL}/tags`;
  private edTags$: Subject<Tag[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private local: CRUDLocalService
  ) {}

  public subscribeTags() {
    return this.edTags$.asObservable();
  }
  public changeObservableTags(tagsGet: Tag[]) {
    this.edTags$.next(tagsGet);
  }

  /* -------------CRUD´s Methods------------- */

  public getAllTags(): Tag[] {
    let ret: Tag[] = [];
    this.http.get<Tag[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.setAll<Tag>(res, GET_ALL);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
  }
  public getTags(id: number) {
    this.http.get<Tag[]>(this.URL + `/list/${id}`).subscribe({
      next: (res) => this.changeObservableTags(res),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }
  public getOne(name: string): Observable<Tag> {
    return this.http.get<Tag>(this.URL + `/getOne/${name}`);
  }

  public addTagToEducation(tagId: number, edId: number): Tag {
    let ret: Tag = {} as Tag;
    this.http.get<Tag>(this.URL + `/add/${tagId}/${edId}`).subscribe({
      next: (res) => (ret = res),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        this.popup.showMessage('Agregado correctamente');
      },
    });
    return ret;
  }
  public removeTagToEducation(tagId: number, edId: number) {
    this.http.get<Message>(this.URL + `/remove/${tagId}/${edId}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }

  public createTag(tag: Tag) {
    this.http.post<Message>(this.URL + '/create', tag).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }

  public deleteTag(id: number) {
    this.http.delete<Message>(this.URL + `/delete/${id}`).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }

  public updateTag(tag: Tag) {
    this.http.put<Message>(this.URL + `/update/${tag.id}`, tag).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }
}
