import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";

import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { EventsComponent } from "./events/events.component";
import { SafeHtmlPipePipe } from "../pipes/safe-html-pipe.pipe";
import { ThumbnailPipe } from "../pipes/thumbnail.pipe";
import { PreviewPipe } from "../pipes/preview.pipe";
import { BackgroundComponent } from "./background/background.component";
import { DateReversePipe } from "../pipes/date-reverse.pipe";

registerLocaleData(localeFr, "fr");

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    EventsComponent,
    SafeHtmlPipePipe,
    ThumbnailPipe,
    PreviewPipe,
    BackgroundComponent,
    DateReversePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "fr" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
