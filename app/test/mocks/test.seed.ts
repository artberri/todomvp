import { Todo } from '../../src';

export const activeTodo = new Todo('Initially active todo');
export const completedTodo = new Todo('Initially active todo');
completedTodo.complete();

export const seedTodos: Todo[] = [activeTodo, completedTodo];
