import { ITodosView, Todo } from '../../../src';

export const setTodos = jest.fn();

export class TodosViewMock implements ITodosView {
  public setTodos: (todos: Todo[]) => void = setTodos;
}
