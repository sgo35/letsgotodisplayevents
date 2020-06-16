import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { Bdevent } from "../../interfaces/bdevent";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit, OnDestroy {
  events: Bdevent[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  // REST_API_SERVER: string =
  // "https://sheet.best/api/sheets/1bdf6b4a-b3f4-44a3-9286-45269304a80a";

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .sendGetRequest<Bdevent>()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Bdevent[]>) => {
        console.log(res);
        this.events = res.body;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
