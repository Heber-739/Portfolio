import { Image } from './Image';
import { Tag } from './tag';

export class Education {
  id?: number;
  name: string;
  link: string;
  finish: boolean;
  img: Image;
  tags?: Tag[];
  constructor(name: string, link: string, finish: boolean, img: Image) {
    this.name = name;
    this.link = link;
    this.finish = finish;
    this.img = img;
  }
}
