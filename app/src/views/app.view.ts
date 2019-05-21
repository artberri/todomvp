import { Todo } from '../model';
import { IAppPresenter, TodoFilterType } from '../presenters';

export abstract class AppView {
  protected presenter!: IAppPresenter;

  public abstract setTodos(todos: Todo[]): void;
  public abstract setFilter(filter: TodoFilterType): void;
  public abstract showList(): void;
  public abstract hideList(): void;
  public abstract emptyTodoInput(): void;

  public onShowAllTodosClicked(): void {
    this.presenter.showAllTodos();
  }

  public onShowActiveTodosClicked(): void {
    this.presenter.showAllTodos();
  }

  public onShowCompletedTodosClicked(): void {
    this.presenter.showAllTodos();
  }

  public onAddTodo(title: string): void {
    this.presenter.showAllTodos();
  }
}
