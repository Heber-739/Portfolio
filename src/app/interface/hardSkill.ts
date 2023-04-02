import { Image } from './Image';

export class HardSkill {
  id?: number;
  name: string;
  percentage: number;
  img: Image;
  constructor(name: string, percentage: number, img: Image) {
    (this.name = name), (this.percentage = percentage), (this.img = img);
  }
}
