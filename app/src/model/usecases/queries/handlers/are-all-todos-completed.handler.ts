import { SimpleQueryHandler, Service } from '../../../../framework';
import { AreAllTodosCompletedQuery } from '../are-all-todos-completed.query';
import { TodosState } from '../../../state';

@Service()
export class AreAllTodosCompletedQueryHandler extends SimpleQueryHandler<boolean> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(AreAllTodosCompletedQuery);
  }

  public handle(): boolean {
    return this.todosState.state.every((todo) => todo.isCompleted);
  }
}
