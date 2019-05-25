import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { AppPresenter } from '../../../src/presenters';
import { Todo, TodosState } from '../../../src/model';
import { IAppView } from '../../../src/views';

import * as appViewMock from '../../mocks/views/app-view.mock';
import * as storageMock from '../../mocks/infrastructure/storage.mock';

describe('AppPresenter', () => {
  let presenter: AppPresenter;
  let appView: IAppView;
  let activeTodo: Todo;
  let completedTodo: Todo;

  afterEach(() => {
    jest.clearAllMocks();
    Injector.reset();
  });

  describe('On load', () => {
    describe('when no todos on storage', () => {
      beforeEach(() => {
        storageMock.getTodos.mockReturnValue([]);

        bootstrap(storageMock.TodoStorageMock);
        appView = new appViewMock.AppViewMock();
        presenter = Injector.resolve<AppPresenter>(AppPresenter);
      });

      test('hides the todo list', () => {
        presenter.attach(appView);

        expect(appViewMock.hideList).toHaveBeenCalled();
      });
    });

    describe('when there are todos on storage', () => {
      beforeEach(() => {
        activeTodo = new Todo('Initially active todo');
        completedTodo = new Todo('Initially completed todo');
        completedTodo.complete();
        storageMock.getTodos.mockReturnValue([activeTodo, completedTodo]);

        bootstrap(storageMock.TodoStorageMock);
        appView = new appViewMock.AppViewMock();
        presenter = Injector.resolve<AppPresenter>(AppPresenter);
      });

      test('shows the todo list', () => {
        presenter.attach(appView);

        expect(appViewMock.showList).toHaveBeenCalled();
      });
    });
  });

  describe('On state change', () => {
    const todo = new Todo('todo');

    beforeEach(() => {
      storageMock.getTodos.mockReturnValue([todo]);

      bootstrap(storageMock.TodoStorageMock);
      appView = new appViewMock.AppViewMock();
      presenter = Injector.resolve<AppPresenter>(AppPresenter);
      presenter.attach(appView);
    });

    test('saves todos', () => {
      const todoState = Injector.resolve<TodosState>(TodosState);
      const newTodo = new Todo('todo');
      todoState.add(newTodo);

      expect(storageMock.saveTodos).toHaveBeenCalledWith([newTodo]);
    });

    describe('when no todos on storage', () => {
      test('hides the todo list', () => {
        const todoState = Injector.resolve<TodosState>(TodosState);
        todoState.remove(todo);

        expect(appViewMock.hideList).toHaveBeenCalled();
      });
    });

    describe('when there are todos on storage', () => {
      test('shows the todo list', () => {
        const todoState = Injector.resolve<TodosState>(TodosState);
        todoState.add(todo);

        expect(appViewMock.showList).toHaveBeenCalled();
      });
    });
  });
});
