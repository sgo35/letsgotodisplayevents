import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private REST_API_SERVER = "http://localhost:3000/events";
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";

  constructor(private httpClient: HttpClient) {}

  parseLinkHeader(header) {
    if (!header || header.length == 0) {
      return;
    }

    let parts = header.split(",");
    var links = {};
    parts.forEach((p) => {
      let section = p.split(";");
      var url = section[0].replace(/<(.*)>/, "$1").trim();
      var name = section[1].replace(/rel="(.*)"/, "$1").trim();
      links[name] = url;
    });

    this.first = links["first"];
    this.last = links["last"];
    this.prev = links["prev"];
    this.next = links["next"];
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest<T>(url?: string, from_string?: string) {
    return this.httpClient
      .get<T[]>(url ? url : this.REST_API_SERVER, {
        params: new HttpParams({ fromString: from_string }),
        observe: "response",
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          console.log(res.headers.get("Link"));
          this.parseLinkHeader(res.headers.get("Link"));
        })
      );
  }

  public sendGetRequestObject<T>(url: string) {
    return this.httpClient
      .get<T>(url, { observe: "response" })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          console.log(res.headers.get("Link"));
          this.parseLinkHeader(res.headers.get("Link"));
        })
      );
  }
}
