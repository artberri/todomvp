import { ITodosView, Todo, TodoFilterType } from '../../../src';

export const setTodos = jest.fn();

export class TodosViewMock implements ITodosView {
  public filter!: TodoFilterType;
  public setTodos: (todos: Todo[]) => void = setTodos;
}
