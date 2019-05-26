import { CommandHandler, Service } from '../../../framework';
import { RemoveTodoCommand } from '../commands';
import { TodosState } from '../../state';
import { Todo } from '../../domain';

@Service()
export class RemoveTodoCommandHandler extends CommandHandler<Todo> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(RemoveTodoCommand);
  }

  public handle(todo: Todo): void {
    this.todosState.remove(todo);
  }
}
