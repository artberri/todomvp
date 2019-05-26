import Vue from 'vue';
import { TodoStorageService, Todo, Service } from '../../../app/src';

const STORAGE_KEY = 'vuemvp-todos';

interface ITodoDto {
  id: number;
  title: string;
  completed: boolean;
}

@Service()
export class TodoLocalStorageService implements TodoStorageService {

  public getTodos(): Todo[] {
    const persistedTodos: ITodoDto[] = JSON.parse((Vue as any).localStorage.get(STORAGE_KEY) || '[]');
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
    (Vue as any).localStorage.set(STORAGE_KEY, JSON.stringify(todoDtos));
  }
}
