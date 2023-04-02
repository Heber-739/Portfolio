export class Image {
  data: string | ArrayBuffer | null;
  name: string;
  type: string;
  constructor(data: string | ArrayBuffer | null, name: string, type: string) {
    this.data = data;
    this.name = name;
    this.type = type;
  }
}
