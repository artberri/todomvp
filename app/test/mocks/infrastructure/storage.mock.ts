import {
    Service,
    TodoStorageService,
    Todo
} from '../../../src';

export const getTodos = jest.fn();
export const saveTodos = jest.fn();

@Service()
export class TodoStorageMock implements TodoStorageService {
  public getTodos: () => Todo[] = getTodos;
  public saveTodos: (todos: Todo[]) => void = saveTodos;
}
