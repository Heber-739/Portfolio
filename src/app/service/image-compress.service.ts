import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Image } from '../interface/Image';

@Injectable({
  providedIn: 'root',
})
export class ImageCompressService {
  constructor(private ngxC: NgxImageCompressService) {}

  compress(): Promise<Image> {
    return new Promise<Image>((resolve) => {
      this.ngxC.uploadFile().then(({ image, orientation, fileName }) => {
        this.ngxC
          .compressFile(image, orientation, 100, 50)
          .then((compressedImage) => {
            const getType = (t: string) => t.slice(5, t.indexOf(';'));
            return fetch(compressedImage)
              .then((res) => res.blob())
              .then((blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                  let base64: string = String(reader.result);
                  resolve(new Image(base64, fileName, getType(image)));
                };
                reader.readAsDataURL(blob);
              });
          });
      });
    });
  }
}
