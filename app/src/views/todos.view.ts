import { Todo } from '../model';

export interface ITodosView {
  setTodos(todos: Todo[]): void;
}
