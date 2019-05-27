import { SimpleQueryHandler, Service } from '../../../../framework';
import { GetVisibleTodosQuery } from '../get-visible-todos.query';
import { FilterState, TodosState } from '../../../state';
import { Todo } from '../../../domain';

@Service()
export class GetVisibleTodosQueryHandler extends SimpleQueryHandler<Todo[]> {
  constructor(
    private readonly filterState: FilterState,
    private readonly todosState: TodosState
  ) {
    super(GetVisibleTodosQuery);
  }

  public handle(): Todo[] {
    switch (this.filterState.state) {
      case 'active':
          return this.todosState.state.filter(t => !t.isCompleted);
      case 'completed':
        return this.todosState.state.filter(t => t.isCompleted);
      default:
        return this.todosState.state;
    }
  }
}
