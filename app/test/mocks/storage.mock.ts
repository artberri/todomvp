import {
    Service,
    StoragePort,
    Todo
} from '../../src';
import { seedTodos } from './test.seed';

@Service()
export class StorageMock implements StoragePort {
  public getTodos(): Todo[] {
    return seedTodos;
  }  public saveTodos(todos: Todo[]): void {
    throw new Error('Method not implemented.');
  }
}
