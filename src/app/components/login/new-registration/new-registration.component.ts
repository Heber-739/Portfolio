import { Component } from '@angular/core';
import { confirm, MyValidators } from './validators';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { JwtDto } from 'src/app/backend/interface/jwt-dto';
import { NewUser } from 'src/app/backend/interface/newUser';
import { AuthService } from 'src/app/backend/service/auth.service';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css'],
})
export class NewRegistrationComponent {
  newRegistration!: JwtDto;

  logup = new UntypedFormGroup(
    {
      names: new UntypedFormControl('', [Validators.required]),
      username: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        MyValidators.haveNumber(/[0-9]/),
        MyValidators.haveCharacter(/[^\s\w]/),
        MyValidators.haveSpace(/^[\S]+$/),
        MyValidators.haveStringMay(/[A-Z]/),
        MyValidators.haveStringMin(/[a-z]/),
      ]),
      passwordConfirm: new UntypedFormControl('', [Validators.required]),
    },
    confirm
  );

  constructor(private authService: AuthService) {}

  checkIn() {
    const mail: string = this.logup.get('email')?.value.toLowerCase();
    const newUser: NewUser = {
      name: this.logup.get('names')?.value,
      username: this.logup.get('username')?.value,
      email: mail,
      password: this.logup.get('password')?.value,
    };
    this.authService.newUser(newUser);
    this.logup.reset();
  }
}
