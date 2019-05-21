import { Mediator } from '../framework';
import { AppView } from '../views';
import {
  GetAllTodosQuery,
  AddTodoCommand,
  Todo
} from '../model';
import { TodoFilterType } from './types';
import { IAppPresenter } from './app.presenter.contract';

export class AppPresenter implements IAppPresenter {
  private allTodos: Todo[] = [];
  private filter: TodoFilterType = 'none';

  constructor(
    private readonly view: AppView,
    private readonly mediator: Mediator
  ) {
    this.retrieveTodos();
  }

  public showAllTodos(): void {
    this.filter = 'none';
    this.refreshView();
  }

  public showActiveTodos(): void {
    this.filter = 'active';
    this.refreshView();
  }

  public showCompletedTodos(): void {
    this.filter = 'completed';
    this.refreshView();
  }

  public addTodo(newTodoTitle: string): void {
    if (newTodoTitle) {
      this.mediator.send(new AddTodoCommand(newTodoTitle));
      this.retrieveTodos();
    }
  }

  private retrieveTodos(): void {
    this.allTodos = this.mediator.send(new GetAllTodosQuery());
    this.view.emptyTodoInput();
    this.refreshView();
  }

  private refreshView(): void {
    this.refreshFilter();
    this.refreshTodos();
    this.refreshListVisibility();
  }

  private refreshFilter(): void {
    this.view.setFilter(this.filter);
  }

  private refreshTodos(): void {
    let todos: Todo[];
    switch (this.filter) {
      case 'active':
        todos = this.getGetTodosWithCompleted(false);
        break;
      case 'completed':
        todos = this.getGetTodosWithCompleted(true);
        break;
      default:
        todos = this.allTodos;
    }
    this.view.setTodos(todos);
  }

  private refreshListVisibility(): void {
    if (this.allTodos.length > 0) {
      this.view.showList();
    } else {
      this.view.hideList();
    }
  }

  private getGetTodosWithCompleted(completed: boolean): Todo[] {
    return this.allTodos.filter((todo: Todo) => todo.isCompleted === completed);
  }
}
