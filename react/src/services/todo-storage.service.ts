import { TodoStorageService, Todo, Service } from '../core';

const STORAGE_KEY = 'reactmvp-todos';

interface ITodoDto {
  id: number;
  title: string;
  completed: boolean;
}

@Service()
export class TodoLocalStorageService implements TodoStorageService {

  public getTodos(): Todo[] {
    const persistedTodos: ITodoDto[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return persistedTodos.map((t) => new Todo(t.id, t.title, t.completed));
  }

  public saveTodos(todos: Todo[]): void {
    const todoDtos: ITodoDto[] = todos.map((t) => {
      return {
        id: t.id,
        title: t.title,
        completed: t.isCompleted
      };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoDtos));
  }
}
