import { CommandHandler, Service } from '../../../../framework';
import { AddTodoCommand } from '../../commands';
import { Todo, TodoRepository } from '../../../domain';
import { Notifier, TodosChanged } from '../../../events';

@Service()
export class AddTodoCommandHandler extends CommandHandler<string> {
  constructor(
    private readonly repository: TodoRepository,
    private readonly notifier: Notifier
  ) {
    super(AddTodoCommand);
  }

  public handle(title: string): void {
    const todo = new Todo(title);
    this.repository.add(todo);
    this.notifier.emit(new TodosChanged(this.repository.getAll()));
    this.repository.save();
  }
}
