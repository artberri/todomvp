import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './todos/todo/todo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TodosComponent } from './todos/todos.component';
import { CompleteAllComponent } from './complete-all/complete-all.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HeaderComponent,
    FooterComponent,
    TodosComponent,
    CompleteAllComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
