import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DataUrl,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';
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
      this.myimage = this.user.img;
      this.type_img = this.user.type_img;
    }
  }

  sendUser() {
    const newUser: DataUser = {
      name: this.userForm.get('name')?.value,
      surname: this.userForm.get('surname')?.value,
      age: parseInt(this.userForm.get('age')?.value),
      img: this.myimage,
      type_img: this.type_img,
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
  onchange(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    let image = target.files?.[0]!;
    this.image = image;
    this.type_img = image.type;
    this.myimage = this.getBase64(image);
  }

  onFileSelected(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    let image = target.files?.[0]!;
    this.compress.compressFile(image, -1, 50, 50).then((result) => {
      const formData: FormData = new FormData();
      formData.append('file', result.data, result.name);
      return result;
    });
  }

  getBase64(file: File) {
    let reader = new FileReader();
    reader.onload = () => {
      this.myimage = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
