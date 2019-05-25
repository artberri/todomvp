import { Todo } from '../../model';
import { Service, StateContainer } from '../../framework';

@Service()
export class TodosState extends StateContainer<Todo[]> {
  constructor() {
    super([]);
  }

  public initialize(todos: Todo[]): void {
    this.setState(todos);
  }

  public removeCompleted(): void {
    this.setState(this.state.filter(todo => todo.isCompleted === false));
  }

  public remove(todo: Todo): void {
    this.setState(this.state.filter(t => t !== todo));
  }

  public add(todo: Todo): void {
    this.setState([
      ...this.state,
      todo
    ]);
  }

}
