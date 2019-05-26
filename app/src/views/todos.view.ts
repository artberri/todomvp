import { Todo, TodoFilterType } from '../model';

export interface ITodosView {
  filter: TodoFilterType;
  setTodos(todos: Todo[]): void;
}
