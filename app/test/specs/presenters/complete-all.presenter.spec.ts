import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { CompleteAllPresenter } from '../../../src/presenters';
import { ICompleteAllView } from '../../../src/views';
import { TodosState, AppState, Todo } from '../../../src/model';

import * as completaAllViewMock from '../../mocks/views/complete-all-view.mock';
import * as storageMock from '../../mocks/infrastructure/storage.mock';

describe('CompleteAllPresenter', () => {
  let presenter: CompleteAllPresenter;
  let view: ICompleteAllView;
  let activeTodo: Todo;
  let activeTodo2: Todo;
  let completedTodo: Todo;
  let todosState: TodosState;

  beforeEach(() => {
    activeTodo = new Todo('Initially active todo');
    activeTodo2 = new Todo('Initially active todo2');
    completedTodo = new Todo('Initially completed todo');
    completedTodo.complete();
    bootstrap(storageMock.TodoStorageMock);
    view = new completaAllViewMock.CompleteAllViewMock();
    presenter = Injector.resolve<CompleteAllPresenter>(CompleteAllPresenter);
  });

  afterEach(() => {
    jest.clearAllMocks();
    Injector.reset();
  });

  describe('On load', () => {
    describe('when there are active todos', () => {
      test('unchecks the checkbox', () => {
        todosState = Injector.resolve<TodosState>(TodosState);
        todosState.initialize([activeTodo, completedTodo, activeTodo2]);

        presenter.attach(view);

        expect(view.uncheck).toHaveBeenCalled();
      });
    });

    describe('when all todos are completed', () => {
      test('checks the checkbox', () => {
        todosState = Injector.resolve<TodosState>(TodosState);
        todosState.initialize([completedTodo]);

        presenter.attach(view);

        expect(view.check).toHaveBeenCalled();
      });
    });
  });

  describe('On state change', () => {
    beforeEach(() => {
      todosState = Injector.resolve<TodosState>(TodosState);
      todosState.initialize([completedTodo]);
      presenter.attach(view);
      jest.clearAllMocks();
    });

    describe('when there are active todos', () => {
      test('unchecks the checkbox', () => {
        todosState.add(activeTodo2);

        expect(view.uncheck).toHaveBeenCalled();
      });
    });

    describe('when all todos are completed', () => {
      test('checks the checkbox', () => {
        const newTodo = new Todo('new');
        newTodo.complete();
        todosState.add(newTodo);

        expect(view.check).toHaveBeenCalled();
      });
    });
  });

  describe('User actions', () => {
    let appState: AppState;

    describe('On click complete all checkbox', () => {
      describe('when there are active todos', () => {
        beforeEach(() => {
          todosState = Injector.resolve<TodosState>(TodosState);
          todosState.initialize([activeTodo, completedTodo, activeTodo2]);
          presenter.attach(view);
          appState = Injector.resolve<AppState>(AppState);
          jest.clearAllMocks();
        });

        test('completes all todos', () => {
          presenter.completeAll();

          expect(appState.areAllCompleted).toBe(true);
        });
      });

      describe('when all todos are completed', () => {
        beforeEach(() => {
          todosState = Injector.resolve<TodosState>(TodosState);
          todosState.initialize([completedTodo]);
          presenter.attach(view);
          appState = Injector.resolve<AppState>(AppState);
          jest.clearAllMocks();
        });

        test('activates all todos', () => {
          presenter.completeAll();

          expect(appState.todos[0].isCompleted).toBe(false);
        });
      });
    });
  });
});
