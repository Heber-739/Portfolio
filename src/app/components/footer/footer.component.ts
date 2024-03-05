import { Component } from '@angular/core';
import {
  DATA,
  CRUDLocalService,
} from 'src/app/backend/service/CRUD-Local.service';
import { DataUser } from 'src/app/interface/dataUser';

const { user } = DATA;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  github: string;
  linkedin: string;

  constructor(private local: CRUDLocalService) {
    let user_ = this.local.get<DataUser>(user);
    [this.github, this.linkedin] = [user_.github, user_.linkedin];
  }
}
