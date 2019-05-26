import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';

export const appRoutes: Routes = [
  {
    path: 'completed',
    component: TodosComponent,
    data: { filter: 'completed' }
  },
  {
    path: 'active',
    component: TodosComponent,
    data: { filter: 'active' }
  },
  {
    path: '',
    component: TodosComponent,
    data: { filter: 'none' }
  }
];
