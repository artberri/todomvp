import { SimpleQueryHandler, Service } from '../../../../framework';
import { GetActiveTodoCountQuery } from '../get-active-todo-count.query';
import { TodosState } from '../../../state';

@Service()
export class GetActiveTodoCountQueryHandler extends SimpleQueryHandler<number> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(GetActiveTodoCountQuery);
  }

  public handle(): number {
    return this.todosState.state.reduce((count, todo) =>
      todo.isCompleted ? count : count + 1,
      0
    );
  }
}
