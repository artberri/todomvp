import { Component, OnInit } from '@angular/core';
import { Todo, ITodosView, TodosPresenter, Injector, TodoFilterType } from '../../../../app/src';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ul.todo-list',
  templateUrl: 'todos.template.html',
  styles: []
})
export class TodosComponent implements ITodosView, OnInit {

  public todos: Todo[];
  public filter: TodoFilterType = 'none';

  protected readonly presenter: TodosPresenter = Injector.resolve(TodosPresenter);

  constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.filter = this.route.snapshot.data['filter'];
    this.presenter.attach(this);
  }

  public setTodos(todos: Todo[]): void {
    this.todos = todos;
  }
}
