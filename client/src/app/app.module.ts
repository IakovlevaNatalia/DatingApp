import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import {AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
   /* AppComponent,
    NavComponent*/
  ],
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    BsDatepickerModule,
    BrowserAnimationsModule,
    NavComponent
  ],
  providers: [],
  /*bootstrap: [AppComponent]*/
  
})
export class AppModule { }
