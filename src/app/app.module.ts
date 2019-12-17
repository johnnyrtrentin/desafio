import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authetication.service';
import { ManipulateListsService } from './services/manipulate-lists.service';
import { ManipulateTasksService } from './services/manipulate-tasks.service';
import { ManipulateStatusService } from './services/manipulate-status.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    ManipulateListsService,
    ManipulateTasksService,
    ManipulateStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
