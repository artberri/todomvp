import { CommandHandler, Service } from '../../../framework';
import { AddTodoCommand } from '../commands';
import { Todo } from '../../domain';
import { TodosState } from '../../state';

@Service()
export class AddTodoCommandHandler extends CommandHandler<string> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(AddTodoCommand);
  }

  public handle(title: string): void {
    const todo = new Todo(title);
    this.todosState.add(todo);
  }
}
