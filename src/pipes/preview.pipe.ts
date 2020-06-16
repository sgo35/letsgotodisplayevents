import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "preview",
})
export class PreviewPipe implements PipeTransform {
  transform(value: string, force: boolean = true): string {
    let image = "";
    if (value) {
      image = value;
    }
    if (force) {
      if (image.indexOf("open?id=") != -1) {
        image = image.replace("open?id=", "file/d/");
        image += "/preview?usp=embed_facebook";
      }
    }
    return image;
  }
}
