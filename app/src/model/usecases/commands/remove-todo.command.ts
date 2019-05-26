import { Command } from '../../../framework';
import { Todo } from '../../domain';

export class RemoveTodoCommand extends Command<Todo> {
  public readonly payload: Todo;

  constructor(todo: Todo) {
    super();
    this.payload = todo;
  }
}
