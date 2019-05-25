import { Command } from '../../../framework';
import { Todo } from '../../domain';

export class SaveTodosCommand extends Command<Todo[]> {
  public payload: Todo[];

  constructor(todos: Todo[]) {
    super();
    this.payload = todos;
  }
}
