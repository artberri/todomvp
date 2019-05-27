import { CommandHandler, Service } from '../../../../framework';
import { ClearCompletedCommand } from '../clear-completed.command';
import { TodosState } from '../../../state';

@Service()
export class ClearCompletedCommandHandler extends CommandHandler<string> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(ClearCompletedCommand);
  }

  public handle(): void {
    this.todosState.clearCompleted();
  }
}
