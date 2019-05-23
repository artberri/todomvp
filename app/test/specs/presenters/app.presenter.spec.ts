import { bootstrap, AppPresenter, AppView, Todo, Injector } from '../../../src';

import * as appViewMock from '../../mocks/views/app-view.mock';
import * as storageMock from '../../mocks/infrastructure/storage.mock';

describe('AppPresenter', () => {
  let presenter: AppPresenter;
  let appView: AppView;
  let activeTodo: Todo;
  let completedTodo: Todo;

  beforeEach(() => {
    activeTodo = new Todo('Initially active todo');
    completedTodo = new Todo('Initially completed todo');
    completedTodo.complete();
    storageMock.getTodos.mockReturnValue([activeTodo, completedTodo]);

    bootstrap(storageMock.StorageMock);
    appView = new appViewMock.AppViewMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
    Injector.reset();
  });

  describe('On load', () => {
    test('intializes the view', () => {
      presenter = Injector.resolve<AppPresenter>(AppPresenter);
      presenter.attach(appView);

      expect(appViewMock.showList).toHaveBeenCalled();
      expect(appViewMock.emptyTodoInput).toHaveBeenCalled();
      expect(appViewMock.setFilter).toHaveBeenCalledWith('none');
      expect(appViewMock.setTodos).toHaveBeenCalledWith([activeTodo, completedTodo]);
    });
  });

  describe('User actions', () => {
    beforeEach(() => {
      presenter = Injector.resolve<AppPresenter>(AppPresenter);
      presenter.attach(appView);
      jest.clearAllMocks();
    });

    describe('showAllTodos', () => {
      test('shows all todos', () => {
        presenter.showAllTodos();

        expect(appViewMock.showList).toHaveBeenCalled();
        expect(appViewMock.setFilter).toHaveBeenCalledWith('none');
        expect(appViewMock.setTodos).toHaveBeenCalledWith([activeTodo, completedTodo]);
      });
    });

    describe('showActiveTodos', () => {
      test('shows active todos', () => {
        presenter.showActiveTodos();

        expect(appViewMock.showList).toHaveBeenCalled();
        expect(appViewMock.setFilter).toHaveBeenCalledWith('active');
        expect(appViewMock.setTodos).toHaveBeenCalledWith([activeTodo]);
      });
    });

    describe('showCompletedTodos', () => {
      test('shows completed todos', () => {
        presenter.showCompletedTodos();

        expect(appViewMock.showList).toHaveBeenCalled();
        expect(appViewMock.setFilter).toHaveBeenCalledWith('completed');
        expect(appViewMock.setTodos).toHaveBeenCalledWith([completedTodo]);
      });
    });

    describe('addTodo', () => {
      const newTodoTitle = 'newtitle';

      describe('given empty input', () => {
        test('does not add a new todo to the view and does not save anything', () => {
          presenter.addTodo('');

          expect(appViewMock.setTodos).not.toHaveBeenCalled();
          expect(storageMock.saveTodos).not.toHaveBeenCalled();
        });
      });

      describe('given all todos are shown', () => {
        beforeEach(() => {
          presenter.showAllTodos();
          jest.clearAllMocks();
        });

        test('adds the new todo to the view and clears the input', () => {
          presenter.addTodo(newTodoTitle);

          expect(appViewMock.showList).toHaveBeenCalled();
          expect(appViewMock.emptyTodoInput).toHaveBeenCalled();
          expect(appViewMock.setTodos).toHaveBeenCalledWith([activeTodo, completedTodo, new Todo(newTodoTitle)]);
        });

        test('saves all current todos including the new one', () => {
          presenter.addTodo(newTodoTitle);

          expect(storageMock.saveTodos).toHaveBeenCalledWith([activeTodo, completedTodo, new Todo('newtitle')]);
        });
      });

      describe('given active todos are shown', () => {
        beforeEach(() => {
          presenter.showActiveTodos();
          jest.clearAllMocks();
        });

        test('adds the new todo to the view and clears the input', () => {
          presenter.addTodo(newTodoTitle);

          expect(appViewMock.showList).toHaveBeenCalled();
          expect(appViewMock.emptyTodoInput).toHaveBeenCalled();
          expect(appViewMock.setTodos).toHaveBeenCalledWith([activeTodo, new Todo(newTodoTitle)]);
        });

        test('saves all current todos including the new one', () => {
          presenter.addTodo(newTodoTitle);

          expect(storageMock.saveTodos).toHaveBeenCalledWith([activeTodo, completedTodo, new Todo('newtitle')]);
        });
      });

      describe('given completed todos are shown', () => {
        beforeEach(() => {
          presenter.showCompletedTodos();
          jest.clearAllMocks();
        });

        test('does not add the new todo to the view and clears the input', () => {
          presenter.addTodo(newTodoTitle);

          expect(appViewMock.showList).toHaveBeenCalled();
          expect(appViewMock.emptyTodoInput).toHaveBeenCalled();
          expect(appViewMock.setTodos).toHaveBeenCalledWith([completedTodo]);
        });

        test('saves all current todos including the new one', () => {
          presenter.addTodo(newTodoTitle);

          expect(storageMock.saveTodos).toHaveBeenCalledWith([activeTodo, completedTodo, new Todo('newtitle')]);
        });
      });
    });
  });
});
