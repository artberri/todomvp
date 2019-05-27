import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { TodosPresenter } from '../../../src/presenters';
import { Todo, TodosState, FilterState } from '../../../src/model';
import { ITodosView } from '../../../src/views';

import * as todosViewMock from '../../mocks/views/todos-view.mock';
import * as storageMock from '../../mocks/infrastructure/storage.mock';

describe('TodosPresenter', () => {
  let presenter: TodosPresenter;
  let todosState: TodosState;
  let filterState: FilterState;
  let view: ITodosView;
  let activeTodo: Todo;
  let activeTodo2: Todo;
  let completedTodo: Todo;

  afterEach(() => {
    jest.clearAllMocks();
    Injector.reset();
  });

  describe('On load', () => {
    beforeEach(() => {
      activeTodo = new Todo(1, 'Initially active todo');
      activeTodo2 = new Todo(2, 'Initially active todo2');
      completedTodo = new Todo(3, 'Initially completed todo');
      completedTodo.complete();

      bootstrap(storageMock.TodoStorageMock);
      view = new todosViewMock.TodosViewMock();
      presenter = Injector.resolve<TodosPresenter>(TodosPresenter);
      todosState = Injector.resolve<TodosState>(TodosState);
      filterState = Injector.resolve<FilterState>(FilterState);
      todosState.initialize([activeTodo, completedTodo, activeTodo2]);
      jest.clearAllMocks();
    });

    describe('when the filter is set to "none"', () => {
      test('shows all todos', () => {
        view.filter = 'none';
        presenter.attach(view);

        expect(view.setTodos).toHaveBeenCalledWith([activeTodo, completedTodo, activeTodo2]);
        expect(filterState.state).toBe('none');
      });
    });

    describe('when the filter is set to "active"', () => {
      test('shows active todos', () => {
        view.filter = 'active';
        presenter.attach(view);

        expect(view.setTodos).toHaveBeenCalledWith([activeTodo, activeTodo2]);
        expect(filterState.state).toBe('active');
      });
    });

    describe('when the filter is set to "completed"', () => {
      test('shows completed todos', () => {
        view.filter = 'completed';
        presenter.attach(view);

        expect(view.setTodos).toHaveBeenCalledWith([completedTodo]);
        expect(filterState.state).toBe('completed');
      });
    });
  });

  describe('On state change', () => {
    let newTodo: Todo;

    beforeEach(() => {
      activeTodo = new Todo(1, 'Initially active todo');
      activeTodo2 = new Todo(2, 'Initially active todo2');
      completedTodo = new Todo(3, 'Initially completed todo');
      completedTodo.complete();

      bootstrap(storageMock.TodoStorageMock);
      view = new todosViewMock.TodosViewMock();
      presenter = Injector.resolve<TodosPresenter>(TodosPresenter);
      todosState = Injector.resolve<TodosState>(TodosState);
      filterState = Injector.resolve<FilterState>(FilterState);
      todosState.initialize([activeTodo, completedTodo, activeTodo2]);
    });

    describe('when the the filter is set to "none"', () => {
      beforeEach(() => {
        newTodo = new Todo(4, 'new');
        view.filter = 'none';
        presenter.attach(view);
        jest.clearAllMocks();
      });

      test('shows all todos', () => {
        todosState.add(newTodo);

        expect(view.setTodos).toHaveBeenCalledWith([activeTodo, completedTodo, activeTodo2, newTodo]);
      });
    });

    describe('when the the filter is set to "active"', () => {
      beforeEach(() => {
        newTodo = new Todo(4, 'new');
        view.filter = 'active';
        presenter.attach(view);
        jest.clearAllMocks();
      });

      test('shows active todos', () => {
        todosState.add(newTodo);

        expect(view.setTodos).toHaveBeenCalledWith([activeTodo, activeTodo2, newTodo]);
      });
    });

    describe('when the the filter is set to "completed"', () => {
      beforeEach(() => {
        newTodo = new Todo(4, 'new');
        view.filter = 'completed';
        presenter.attach(view);
        jest.clearAllMocks();
      });

      test('shows completed todos', () => {
        todosState.add(newTodo);

        expect(view.setTodos).toHaveBeenCalledWith([completedTodo]);
      });
    });
  });
});
