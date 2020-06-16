import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { Pixabay, Hit } from "src/interfaces/pixabay";

const NB_IMG = 10;
const BG_COLOR = "blue";
const BG_KEYWORD = "events";

@Component({
  selector: "app-background",
  templateUrl: "./background.component.html",
  styleUrls: ["./background.component.css"],
})
export class BackgroundComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}

  // url_wallpaper: string;
  url_wallpaper: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  REST_API_SERVER =
    "https://pixabay.com/api/?key=17028142-08c87f5acfad5640d5bdd50e1&min_width=1600&page=1&per_page=" +
    NB_IMG +
    "&q=" +
    BG_KEYWORD +
    "&image_type=photo&orientation=horizontal&colors=" +
    BG_COLOR;

  ngOnInit() {
    var number = Math.floor(Math.random() * NB_IMG) + 1;
    this.dataService
      .sendGetRequestObject<Pixabay>(this.REST_API_SERVER)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Pixabay>) => {
        console.log(res);
        this.url_wallpaper = res.body.hits[number].largeImageURL;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
