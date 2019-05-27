import { CommandHandler, Service } from '../../../../framework';
import { EditTodoCommand, IEditTodoPayload } from '../edit-todo.command';
import { TodosState } from '../../../state';

@Service()
export class EditTodoCommandHandler extends CommandHandler<IEditTodoPayload> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(EditTodoCommand);
  }

  public handle(payload: IEditTodoPayload): void {
    this.todosState.edit(payload.todo, payload.title);
  }
}
