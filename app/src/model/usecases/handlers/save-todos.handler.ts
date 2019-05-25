import { CommandHandler, Service } from '../../../framework';
import { SaveTodosCommand } from '../commands';
import { Todo, TodoStorageService } from '../../domain';

@Service()
export class SaveTodosCommandHandler extends CommandHandler<Todo[]> {
  constructor(
    private readonly todoStorage: TodoStorageService
  ) {
    super(SaveTodosCommand);
  }

  public handle(todos: Todo[]): void {
    this.todoStorage.saveTodos(todos);
  }
}
