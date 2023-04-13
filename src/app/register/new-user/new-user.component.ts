import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { TokenService } from 'src/app/backend/service/token.service';
import { UserService } from 'src/app/backend/service/user.service';
import { Image } from 'src/app/interface/Image';
import { DataUser } from 'src/app/interface/dataUser';

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
    private compress: NgxImageCompressService
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
  getuser() {
    this.userService.sendImage(this.image);
  }
  getimg(id: string) {
    this.userService.getImage(parseInt(id)).subscribe({
      next: (res) => {
        this.res = res;
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  onchange() {
    this.compress.uploadFile().then(({ image, orientation, fileName }) => {
      this.compress
        .compressFile(image, orientation, 50, 50)
        .then((compressedImage) => {
          const getType = (t: string) => t.slice(5, t.indexOf(';'));
          fetch(compressedImage)
            .then((res) => res.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = () => {
                this.image = new Image(
                  String(reader.result),
                  fileName,
                  getType(image)
                );
              };
            });
        });
    });
  }
}
