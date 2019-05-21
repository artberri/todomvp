import { Component, OnInit } from '@angular/core';
import { AppPresenter, Mediator, AppView, Todo, TodoFilterType } from '../../../app/src';

@Component({
  selector: 'app-root',
  templateUrl: 'app.template.html',
  styles: []
})
export class AppComponent extends AppView implements OnInit {
  public newTodoTitle: string;
  public todos: Todo[];
  public filter: TodoFilterType;
  public isListVisible: boolean;

  constructor(private readonly mediator: Mediator) {
    super();
  }

  public ngOnInit(): void {
    this.presenter = new AppPresenter(this, this.mediator);
  }

  public setTodos(todos: Todo[]): void {
    this.todos = todos;
  }

  public setFilter(filter: TodoFilterType): void {
    this.filter = filter;
  }

  public showList(): void {
    this.isListVisible = true;
  }

  public hideList(): void {
    this.isListVisible = false;
  }

  public emptyTodoInput(): void {
    this.newTodoTitle = '';
  }

  public addTodo(): void {
    this.presenter.addTodo(this.newTodoTitle);
  }
}
