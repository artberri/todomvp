import { CommandHandler, Service } from '../../../../framework';
import { ToggleTodoCommand } from '../toggle-todo.command';
import { TodosState } from '../../../state';
import { Todo } from '../../../domain';

@Service()
export class ToggleTodoCommandHandler extends CommandHandler<Todo> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(ToggleTodoCommand);
  }

  public handle(todo: Todo): void {
    this.todosState.toggle(todo);
  }
}
