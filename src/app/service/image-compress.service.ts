import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root',
})
export class ImageCompressService {
  constructor(private ngxC: NgxImageCompressService) {}

  compress(): Promise<string> {
    return new Promise<string>((resolve) => {
      this.ngxC.uploadFile().then(({ image, orientation }) => {
        this.ngxC
          .compressFile(image, orientation, 100, 50)
          .then((compressedImage) => {
            const getType = (t: string) => t.slice(5, t.indexOf(';'));
            return fetch(compressedImage)
              .then((res) => res.blob())
              .then((blob) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result));
                reader.readAsDataURL(blob);
              });
          });
      });
    });
  }
}
