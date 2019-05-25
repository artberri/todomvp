import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Todo, ITodosView, TodosPresenter, Injector } from '../../../../app/src';

@Component({
  selector: '[app-todos]',
  templateUrl: 'todos.template.html',
  styles: []
})
export class TodosComponent implements ITodosView, OnInit {

  public todos: Todo[];

  protected readonly presenter: TodosPresenter = Injector.resolve(TodosPresenter);

  public ngOnInit(): void {
    this.presenter.attach(this);
  }

  public setTodos(todos: Todo[]): void {
    this.todos = todos;
  }
}
