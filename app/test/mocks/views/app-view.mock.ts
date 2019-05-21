import { Todo, TodoFilterType, AppView } from '../../../src';

export const setTodos = jest.fn();
export const setFilter = jest.fn();
export const showList = jest.fn();
export const hideList = jest.fn();
export const emptyTodoInput = jest.fn();

export class AppViewMock extends AppView {
  public setTodos: (todos: Todo[]) => void = setTodos;
  public setFilter: (filter: TodoFilterType) => void = setFilter;
  public showList: () => void = showList;
  public hideList: () => void = hideList;
  public emptyTodoInput: () => void = emptyTodoInput;

  public onShowAllTodosClicked(): void {
    throw new Error('Method not implemented.');
  }
  public onShowActiveTodosClicked(): void {
    throw new Error('Method not implemented.');
  }
  public onShowCompletedTodosClicked(): void {
    throw new Error('Method not implemented.');
  }
  public onAddTodo(title: string): void {
    throw new Error('Method not implemented.');
  }
}
