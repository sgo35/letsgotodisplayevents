import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "thumbnail",
})
export class ThumbnailPipe implements PipeTransform {
  transform(value: string, force: boolean = true): string {
    let image = "";
    if (value) {
      image = value;
    }
    if (force) {
      if (image.indexOf("open") != -1) {
        image = image.replace("open", "thumbnail");
      }
    }
    return image;
  }
}
