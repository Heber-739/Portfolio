import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CRUDLocalService } from 'src/app/backend/service/CRUD-Local.service';
import { UserService } from 'src/app/backend/service/user.service';
import { DataUser } from 'src/app/interface/dataUser';
import { ImageCompressService } from 'src/app/service/image-compress.service';

@Component({
    selector: 'app-new-user',
    imports: [ReactiveFormsModule],
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: DataUser = this.local.get<DataUser>('user');
  image!: string;

  userForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    surname: new UntypedFormControl('', [Validators.required]),
    username: new UntypedFormControl({
      value: this.local.get<string>('username'),
      disabled: true,
    }),
    age: new UntypedFormControl('', [Validators.required, Validators.min(10)]),
    github: new UntypedFormControl('', [Validators.required]),
    linkedin: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
  });
  constructor(
    private local: CRUDLocalService,
    private userService: UserService,
    private compress: ImageCompressService
  ) {}
  ngOnInit(): void {
    if (this.user.username) {
      this.userForm.setValue({
        name: this.user.name,
        surname: this.user.surname,
        username: this.user.username,
        age: this.user.age,
        github: this.user.github,
        linkedin: this.user.linkedin,
        description: this.user.description,
      });
      this.image = this.user.img;
    }
  }

  sendUser() {
    const newUser: DataUser = {
      name: this.userForm.get('name')?.value,
      surname: this.userForm.get('surname')?.value,
      age: parseInt(this.userForm.get('age')?.value),
      img: this.image,
      username: this.userForm.get('username')?.value,
      github: this.userForm.get('github')?.value,
      linkedin: this.userForm.get('linkedin')?.value,
      description: this.userForm.get('description')?.value,
    };
    if (this.user) {
      this.userService.updateUser(newUser);
    } else if (!this.user) {
      this.userService.sendUser(newUser);
    }
  }

  loadImage() {
    this.compress.compress().then((res) => (this.image = res));
  }
}
