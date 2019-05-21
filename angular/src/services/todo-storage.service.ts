import { StorageService, localStorageFactory } from 'ngx-webstorage-service';
import { StoragePort, Todo, Service } from '../../../app/src'

const STORAGE_KEY = 'angularmvp-todos';

interface ITodoDto {
  title: string;
  completed: boolean;
}

@Service()
export class TodoStorageService implements StoragePort {
  private readonly storage: StorageService;

  constructor() {
    this.storage = localStorageFactory();
  }

  public getTodos(): Todo[] {
    const persistedTodos: ITodoDto[] = JSON.parse(this.storage.get(STORAGE_KEY) || '[]');
    return persistedTodos.map(t => new Todo(t.title, t.completed));
  }

  public saveTodos(todos: Todo[]): void {
    const todoDtos: ITodoDto[] = todos.map(t => {
      return {
        title: t.title,
        completed: t.isCompleted
      };
    });
    this.storage.set(STORAGE_KEY, JSON.stringify(todoDtos));
  }
}
