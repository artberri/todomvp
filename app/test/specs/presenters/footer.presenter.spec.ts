import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { FooterPresenter } from '../../../src/presenters';
import { Todo, TodosState, AppState } from '../../../src/model';
import { IFooterView } from '../../../src/views';

import * as footerViewMock from '../../mocks/views/footer-view.mock';
import * as storageMock from '../../mocks/infrastructure/storage.mock';

describe('FooterPresenter', () => {
  let presenter: FooterPresenter;
  let todosState: TodosState;
  let view: IFooterView;
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
      view = new footerViewMock.FooterViewMock();
      presenter = Injector.resolve<FooterPresenter>(FooterPresenter);
      todosState = Injector.resolve<TodosState>(TodosState);
    });

    test('sets the active todo count', () => {
      todosState.initialize([activeTodo, completedTodo, activeTodo2]);
      presenter.attach(view);

      expect(view.setActiveTodoCount).toHaveBeenCalledWith(2);
    });

    describe('when no completed todos', () => {
      beforeEach(() => {
        todosState.initialize([activeTodo, activeTodo2]);
      });

      test('hides the clear completed link', () => {
        presenter.attach(view);

        expect(view.hideClearCompletedLink).toHaveBeenCalled();
      });
    });

    describe('when there are completed todos', () => {
      beforeEach(() => {
        todosState.initialize([activeTodo, completedTodo, activeTodo2]);
      });

      test('shows the clear completed link', () => {
        presenter.attach(view);

        expect(view.showClearCompletedLink).toHaveBeenCalled();
      });
    });
  });

  describe('On state change', () => {
    beforeEach(() => {
      activeTodo = new Todo(1, 'Initially active todo');
      activeTodo2 = new Todo(2, 'Initially active todo2');
      completedTodo = new Todo(3, 'Initially completed todo');
      completedTodo.complete();

      bootstrap(storageMock.TodoStorageMock);
      view = new footerViewMock.FooterViewMock();
      presenter = Injector.resolve<FooterPresenter>(FooterPresenter);
      todosState = Injector.resolve<TodosState>(TodosState);
      jest.clearAllMocks();
    });

    test('sets the active todo count', () => {
      todosState.initialize([activeTodo, completedTodo, activeTodo2]);
      presenter.attach(view);

      todosState.add(new Todo(4, 'new'));

      expect(view.setActiveTodoCount).toHaveBeenCalledWith(3);
    });

    describe('when no completed todos', () => {
      test('hides the clear completed link', () => {
        todosState.initialize([activeTodo, completedTodo, activeTodo2]);
        presenter.attach(view);

        todosState.remove(completedTodo);

        expect(view.hideClearCompletedLink).toHaveBeenCalled();
      });
    });

    describe('when there are completed todos', () => {
      test('shows the clear completed link', () => {
        todosState.initialize([activeTodo, activeTodo2]);
        presenter.attach(view);

        const newTodo = new Todo(4, 'new');
        newTodo.complete();
        todosState.add(newTodo);

        expect(view.showClearCompletedLink).toHaveBeenCalled();
      });
    });
  });

  describe('User actions', () => {
    let appState: AppState;

    beforeEach(() => {
      activeTodo = new Todo(1, 'Initially active todo');
      activeTodo2 = new Todo(3, 'Initially active todo2');
      completedTodo = new Todo(2, 'Initially completed todo');
      completedTodo.complete();

      bootstrap(storageMock.TodoStorageMock);
      view = new footerViewMock.FooterViewMock();
      presenter = Injector.resolve<FooterPresenter>(FooterPresenter);
      todosState = Injector.resolve<TodosState>(TodosState);
      appState = Injector.resolve<AppState>(AppState);
      todosState.initialize([activeTodo, completedTodo, activeTodo2]);
      presenter.attach(view);
      jest.clearAllMocks();
    });

    describe('On click completed link', () => {
      test('removes all completed todos', () => {
        presenter.clearCompleted();

        expect(appState.todos).toStrictEqual([activeTodo, activeTodo2]);
      });
    });
  });
});
