import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

import { AuthenticationService } from './services/authetication.service';
import { ListsService } from './services/list.service';
import { TasksService } from './services/tasks.service';
import { StatusService } from './services/status.service';

import { JwtInterceptor } from './helpers/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    ListsService,
    TasksService,
    StatusService,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
