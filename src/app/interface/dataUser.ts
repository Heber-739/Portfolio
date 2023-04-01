import { Image } from './Image';

export class DataUser {
  name: string;
  surname: string;
  age: number;
  img: Image;
  username: string;
  github: string;
  linkedin: string;
  description: string;
  constructor(
    name: string,
    surname: string,
    age: number,
    img: Image,
    username: string,
    github: string,
    linkedin: string,
    description: string
  ) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.img = img;
    this.username = username;
    this.github = github;
    this.linkedin = linkedin;
    this.description = description;
  }
}
