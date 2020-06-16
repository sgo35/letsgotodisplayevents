import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateReverse",
})
export class DateReversePipe implements PipeTransform {
  transform(dateString: string): Date {
    var date: Date = null;
    if (dateString && dateString.length > 0) {
      dateString =
        dateString.substr(6, 4) +
        "-" +
        dateString.substr(3, 2) +
        "-" +
        dateString.substr(0, 2) +
        "T" +
        dateString.substring(11);
      date = new Date(dateString);
    }
    return date;
  }
}
