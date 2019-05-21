import { CommandHandler, Service } from '../../../../framework';
import { AddTodoCommand } from '../../commands';
import { Todo, TodoRepository } from '../../../domain';

@Service()
export class AddTodoCommandHandler extends CommandHandler<string> {
  constructor(private readonly repository: TodoRepository) {
    super(AddTodoCommand);
  }

  public handle(title: string): void {
    const todo = new Todo(title);
    this.repository.add(todo);
    this.repository.save();
  }
}
