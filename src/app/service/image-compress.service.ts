import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageCompressService {
  imgDespues: string = '';
  constructor(private compress: NgxImageCompressService) {}

  onchange() {
    this.compress.uploadFile().then(({ image, orientation, fileName }) => {
      /* this.imgAntes = image;
      console.log(image); */
      let compressedImg: string = '';
      this.compress
        .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
        .then((compressedImage) => {
          compressedImg = compressedImage;
          let type = this.getType(image);
          fetch(compressedImage)
            .then((res) => res.blob())
            .then((blob) => {
              /* const file = new File([blob], fileName, { type: type });
              this.image = file; */
            });
        });
    });
  }
  getType(text: string): string {
    let res: string = '';
    for (let i = 5; i < text.length; i++) {
      if (text[i] === ';') {
        console.log(res);
        return res;
      }
      res = res.concat(text[i]);
    }
    return '';
  }

  getBase64(file: File) {
    let reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  }
}
