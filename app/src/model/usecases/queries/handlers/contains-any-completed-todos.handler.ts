import { SimpleQueryHandler, Service } from '../../../../framework';
import { ContainsAnyCompletedTodosQuery } from '../contains-any-completed-todos.query';
import { TodosState } from '../../../state';

@Service()
export class ContainsAnyCompletedTodosQueryHandler extends SimpleQueryHandler<boolean> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(ContainsAnyCompletedTodosQuery);
  }

  public handle(): boolean {
    return !!this.todosState.state.find((todo) => todo.isCompleted);
  }
}
