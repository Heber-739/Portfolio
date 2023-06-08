import { Tag } from './tag';

export class Education {
  id?: number;
  name: string;
  link: string;
  finish: boolean;
  image: string;
  tags?: Tag[];
  constructor(name: string, link: string, finish: boolean, image: string) {
    this.name = name;
    this.link = link;
    this.finish = finish;
    this.image = image;
  }
}
