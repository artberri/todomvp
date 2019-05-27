import { CommandHandler, Service } from '../../../../framework';
import { LoadTodosCommand } from '../load-todos.command';
import { TodoStorageService } from '../../../domain';
import { TodosState } from '../../../state';

@Service()
export class LoadTodosCommandHandler extends CommandHandler<string> {
  constructor(
    private readonly todosState: TodosState,
    private readonly todoStorage: TodoStorageService
  ) {
    super(LoadTodosCommand);
  }

  public handle(): void {
    const todos = this.todoStorage.getTodos();
    this.todosState.initialize(todos);
  }
}
