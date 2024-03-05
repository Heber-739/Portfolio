import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/interface/message';
import { Tag } from 'src/app/interface/tag';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { CRUDLocalService, DATA } from './CRUD-Local.service';

const { allTags } = DATA;

@Injectable({
  providedIn: 'root',
})
export class TagService {
  URL: string = `${environment.URL}/tags`;

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private local: CRUDLocalService
  ) {}

  /* -------------CRUD´s Methods------------- */

  public getAllTags(): Tag[] {
    let ret: Tag[] = [];
    this.http.get<Tag[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.set<Tag[]>(res, allTags);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
  }
  public getTags(id: number): Tag[] {
    let ret: Tag[] = [];
    this.http.get<Tag[]>(this.URL + `/list/${id}`).subscribe({
      next: (res) => (ret = res),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
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

  public createTag(tag: Tag): Tag {
    let ret: Tag = {} as Tag;
    this.http.post<Tag>(this.URL + '/create', tag).subscribe({
      next: (res) => {
        this.popup.showMessage('Contenido agregado.');
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
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
