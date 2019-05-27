import { CommandHandler, Service } from '../../../../framework';
import { AddTodoCommand } from '../add-todo.command';
import { Todo } from '../../../domain';
import { TodosState } from '../../../state';

@Service()
export class AddTodoCommandHandler extends CommandHandler<string> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(AddTodoCommand);
  }

  public handle(title: string): void {
    const id = this.todosState.state.reduce((maxId, t) => Math.max(t.id, maxId), -1) + 1;
    const todo = new Todo(id, title);
    this.todosState.add(todo);
  }
}
