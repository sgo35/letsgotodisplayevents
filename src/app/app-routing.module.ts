import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { EventsComponent } from "./events/events.component";

const routes: Routes = [
  { path: "", redirectTo: "events", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "events", component: EventsComponent },
  { path: "admin", component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
