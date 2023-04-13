export class Image {
  id?: number;
  data: string;
  name: string;
  type: string;
  constructor(data: string, name: string, type: string) {
    this.data = data;
    this.name = name;
    this.type = type;
  }
}
