import {
    Service,
    StoragePort,
    Todo
} from '../../../src';

export const getTodos = jest.fn();
export const saveTodos = jest.fn();

@Service()
export class StorageMock implements StoragePort {
  public getTodos: () => Todo[] = getTodos;
  public saveTodos: (todos: Todo[]) => void = saveTodos;
}
