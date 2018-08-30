import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  MatInputModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material'

import { AppComponent } from './app.component'
import { ShowsComponent } from './shows/shows.component'
import { DataService } from './data/data.service'
import { HttpErrorHandler } from './http-error-handler.service'
import { MessageService } from './message.service'
import { MessagesComponent } from './messages/messages.component'

@NgModule({
  declarations: [
    AppComponent,
    ShowsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    DataService,
    HttpErrorHandler,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
