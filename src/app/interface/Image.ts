export class Image {
  data: Blob;
  name: string;
  type: string;
  constructor(data: Blob, name: string, type: string) {
    this.data = data;
    this.name = name;
    this.type = type;
  }
}
