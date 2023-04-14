import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { TokenService } from 'src/app/backend/service/token.service';
import { UserService } from 'src/app/backend/service/user.service';
import { Image } from 'src/app/interface/Image';
import { DataUser } from 'src/app/interface/dataUser';
import { ImageCompressService } from 'src/app/service/image-compress.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  user: DataUser = {} as DataUser;
  edithMode: boolean = false;
  image!: Image;
  res!: Image;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    username: new FormControl({
      value: this.tokenService.getUsername(),
      disabled: true,
    }),
    age: new FormControl('', [Validators.required, Validators.min(10)]),
    github: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private compress: ImageCompressService
  ) {}
  ngOnInit(): void {
    if (this.tokenService.getUser() && this.tokenService.getToken()) {
      this.edithMode = true;
      this.user = this.tokenService.getUser();
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
    if (this.edithMode) {
      this.userService.updateUser(newUser);
    } else if (!this.edithMode) {
      this.userService.sendUser(newUser);
    }
  }
  sendImage() {
    this.userService.sendImage(this.image);
  }
  getImage(num: string) {
    let id: number = parseInt(num);
    this.userService.getImage(id).subscribe({
      next: (res) => (this.res = res),
    });
  }

  loadImage() {
    this.compress.compress();
  }
}
