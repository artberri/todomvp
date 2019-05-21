import { Todo } from '../entities';

export abstract class StoragePort {
    public abstract getTodos(): Todo[];
    public abstract saveTodos(todos: Todo[]): void;
}
