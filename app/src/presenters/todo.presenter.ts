import { Service, BasePresenter, Mediator } from '../framework';
import { ITodoView } from '../views';
import { AppState, ToggleTodoCommand, RemoveTodoCommand, EditTodoCommand } from '../model';

@Service()
export class TodoPresenter extends BasePresenter<ITodoView> {
  constructor(
    private readonly state: AppState,
    private readonly mediator: Mediator
  ) {
    super();
  }

  protected init(): void {
    this.view.setViewMode();
    this.state.subscribe(() => {
      this.view.todo.isCompleted ? this.view.completeTodo() : this.view.activateTodo();
    });
  }

  public editTodo(title: string): void {
    this.mediator.send(new EditTodoCommand({
      todo: this.view.todo,
      title
    }));
    this.view.setViewMode();
  }

  public removeTodo(): void {
    this.mediator.send(new RemoveTodoCommand(this.view.todo));
  }

  public toggleTodo(): void {
    this.mediator.send(new ToggleTodoCommand(this.view.todo));
  }

  public setEditMode(): void {
    this.view.setEditMode();
  }
}
