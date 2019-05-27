import { SimpleQueryHandler, Service } from '../../../../framework';
import { GetAllTodosQuery } from '../get-all-todos.query';
import { TodosState } from '../../../state';
import { Todo } from '../../../domain';

@Service()
export class GetAllTodosQueryHandler extends SimpleQueryHandler<Todo[]> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(GetAllTodosQuery);
  }

  public handle(): Todo[] {
    return this.todosState.state;
  }
}
