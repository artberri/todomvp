import { SimpleQueryHandler, Service } from '../../../../framework';
import { ContainsAnyTodosQuery } from '../contains-any-todos.query';
import { TodosState } from '../../../state';

@Service()
export class ContainsAnyTodosQueryHandler extends SimpleQueryHandler<boolean> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(ContainsAnyTodosQuery);
  }

  public handle(): boolean {
    return this.todosState.state.length > 0;
  }
}
