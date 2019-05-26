import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Todo, TodoMixin, ITodoView, TodoPresenter, Injector } from '../../../../../app/src';
import { BaseView } from 'src/app/base.view';

@Component({
  selector: '[app-todo]',
  templateUrl: 'todo.template.html',
  styles: []
})
export class TodoComponent extends TodoMixin(BaseView) implements ITodoView, OnInit {
  @Input()
  public todo: Todo;

  @HostBinding('class.completed')
  public isCompleted: boolean = false;

  @HostBinding('class.editing')
  public isEditing: boolean = false;
  public todoTitleInput: string;

  public readonly presenter: TodoPresenter = Injector.resolve(TodoPresenter);

  public ngOnInit(): void {
    this.presenter.attach(this);
    this.todoTitleInput = this.todo.title
  }

  public setEditMode(): void {
    this.isEditing = true;
  }

  public setViewMode(): void {
    this.isEditing = false;
  }

  public completeTodo(): void {
    this.isCompleted = true;
  }

  public activateTodo(): void {
    this.isCompleted = false;
  }
}
