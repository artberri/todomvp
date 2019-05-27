import { CommandHandler, Service } from '../../../../framework';
import { CompleteAllCommand } from '../complete-all.command';
import { TodosState } from '../../../state';

@Service()
export class CompleteAllCommandHandler extends CommandHandler<string> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(CompleteAllCommand);
  }

  public handle(): void {
    this.todosState.completeAll();
  }
}
