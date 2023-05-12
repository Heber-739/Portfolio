import { Tag } from './tag';

export class HardSkill {
  id?: number;
  tag: Tag;
  percentage: number;
  constructor(percentage: number, tag: Tag) {
    this.percentage = percentage;
    this.tag = tag;
  }
}
