import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { Product } from "../../interfaces/product";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  products = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .sendGetRequest<Product>(null, "_page=1&_limit=20")
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        console.log(res);
        this.products = res.body;
      });
  }

  public firstPage() {
    this.products = [];
    this.dataService
      .sendGetRequest<Product>(this.dataService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        console.log(res);
        this.products = res.body;
      });
  }
  public previousPage() {
    if (this.dataService.prev !== undefined && this.dataService.prev !== "") {
      this.products = [];
      this.dataService
        .sendGetRequest<Product>(this.dataService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<Product[]>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== "") {
      this.products = [];
      this.dataService
        .sendGetRequest<Product>(this.dataService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<Product[]>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public lastPage() {
    this.products = [];
    this.dataService
      .sendGetRequest<Product>(this.dataService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        console.log(res);
        this.products = res.body;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
