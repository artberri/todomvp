import { Mediator, Service } from '../framework';
import { AppView } from '../views';
import {
  GetAllTodosQuery,
  AddTodoCommand,
  Todo,
  Notifier,
  Events
} from '../model';
import { TodoFilterType } from './types';
import { BasePresenter } from './base.presenter';

@Service()
export class AppPresenter extends BasePresenter<AppView> {
  private allTodos: Todo[] = [];
  private filter: TodoFilterType = 'none';

  constructor(
    private readonly mediator: Mediator,
    private readonly notifier: Notifier
  ) {
    super();
    this.allTodos = this.mediator.send(new GetAllTodosQuery());
    this.notifier.subscribe<Todo[]>(Events.TodosChanged, (todos: Todo[]) => {
      this.allTodos = todos;
      this.refreshTodos();
    });
  }

  protected init(): void {
    this.view.emptyTodoInput();
    this.refreshFilter();
    this.refreshTodos();
  }

  public showAllTodos(): void {
    this.filter = 'none';
    this.refreshFilter();
    this.refreshTodos();
  }

  public showActiveTodos(): void {
    this.filter = 'active';
    this.refreshFilter();
    this.refreshTodos();
  }

  public showCompletedTodos(): void {
    this.filter = 'completed';
    this.refreshFilter();
    this.refreshTodos();
  }

  public addTodo(newTodoTitle: string): void {
    if (newTodoTitle) {
      this.view.emptyTodoInput();
      this.mediator.send(new AddTodoCommand(newTodoTitle));
    }
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
    this.refreshListVisibility();
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
