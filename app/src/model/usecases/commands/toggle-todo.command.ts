import { Command } from '../../../framework';
import { Todo } from '../../domain';

export class ToggleTodoCommand extends Command<Todo> {
  public payload: Todo;

  constructor(todo: Todo) {
    super();
    this.payload = todo;
  }
}
