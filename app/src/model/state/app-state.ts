import { TodosState } from './todos-state';
import { FilterState, TodoFilterType } from './filter-state';
import { Todo } from '../domain';
import { Service, StateContainer } from '../../framework';

interface IState {
  todos: Todo[];
  filter: TodoFilterType;
}

@Service()
export class AppState extends StateContainer<IState> {
  constructor(
    private readonly todosState: TodosState,
    private readonly filterState: FilterState
  ) {
    super({
      todos: [],
      filter: 'none'
    });
    this.todosState.subscribe(() => this.setState(), false);
    this.filterState.subscribe(() => this.setState(), false);
    this.setState();
  }

  public get filter(): TodoFilterType {
    return this.filterState.state;
  }

  public get todos(): Todo[] {
    return this.todosState.state;
  }

  public get visibleTodos(): Todo[] {
    switch (this.filterState.state) {
      case 'active':
          return this.todosState.state.filter(t => !t.isCompleted);
      case 'completed':
        return this.todosState.state.filter(t => t.isCompleted);
      default:
        return this.todosState.state;
    }
  }

  public get activeTodoCount(): number {
    return this.todosState.state.reduce((count, todo) =>
      todo.isCompleted ? count : count + 1,
      0
    );
  }

  public get anyTodos(): boolean {
    return this.todosState.state.length > 0;
  }

  public get anyCompletedTodos(): boolean {
    return !!this.todosState.state.find((todo) => todo.isCompleted);
  }

  public get areAllCompleted(): boolean {
    return this.todosState.state.every((todo) => todo.isCompleted);
  }

  protected setState(): void {
    super.setState({
      todos: this.todosState.state,
      filter: this.filterState.state
    });
  }
}
