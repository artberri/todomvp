import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { Mediator } from '../../../app/src';
import { mediatorFactory } from '../services';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    { provide: Mediator, useFactory: mediatorFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
