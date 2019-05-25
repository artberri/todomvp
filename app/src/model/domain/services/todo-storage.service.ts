import { Todo } from '../entities';

export abstract class TodoStorageService {
    public abstract getTodos(): Todo[];
    public abstract saveTodos(todos: Todo[]): void;
}
