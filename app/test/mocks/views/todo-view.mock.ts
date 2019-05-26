import { ITodoView, TodoMixin } from '../../../src/views';
import { Todo } from '../../../src/model';
import { BaseView } from './base.view';

export const setEditMode = jest.fn();
export const setViewMode = jest.fn();
export const completeTodo = jest.fn();
export const activateTodo = jest.fn();

export class TodoViewMock extends TodoMixin(BaseView) implements ITodoView {
  public todo!: Todo;

  public setEditMode: () => void = setEditMode;
  public setViewMode: () => void = setViewMode;
  public completeTodo: () => void = completeTodo;
  public activateTodo: () => void = activateTodo;
}
