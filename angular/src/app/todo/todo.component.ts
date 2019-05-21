import { Component, Input, HostBinding } from '@angular/core';
import { Todo } from '../../../../app/src';

@Component({
  selector: '[app-todo]',
  templateUrl: 'todo.template.html',
  styles: []
})
export class TodoComponent {
  @Input()
  public todo: Todo;

  @HostBinding('class.completed')
  public get isCompleted(): boolean {
    return this.todo.isCompleted;
  }
}
