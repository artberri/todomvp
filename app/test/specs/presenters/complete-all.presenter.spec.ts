import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { CompleteAllPresenter } from '../../../src/presenters';
import { ICompleteAllView } from '../../../src/views';
import { TodosState, Todo } from '../../../src/model';

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
    activeTodo = new Todo(1, 'Initially active todo');
    activeTodo2 = new Todo(2, 'Initially active todo2');
    completedTodo = new Todo(3, 'Initially completed todo');
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
        const newTodo = new Todo(4, 'new');
        newTodo.complete();
        todosState.add(newTodo);

        expect(view.check).toHaveBeenCalled();
      });
    });
  });

  describe('User actions', () => {
    describe('On click complete all checkbox', () => {
      describe('when there are active todos', () => {
        beforeEach(() => {
          todosState = Injector.resolve<TodosState>(TodosState);
          todosState.initialize([activeTodo, completedTodo, activeTodo2]);
          presenter.attach(view);
          jest.clearAllMocks();
        });

        test('completes all todos', () => {
          presenter.completeAll();

          expect(todosState.state[0].isCompleted).toBe(true);
          expect(todosState.state[1].isCompleted).toBe(true);
          expect(todosState.state[2].isCompleted).toBe(true);
        });
      });

      describe('when all todos are completed', () => {
        beforeEach(() => {
          todosState = Injector.resolve<TodosState>(TodosState);
          todosState.initialize([completedTodo]);
          presenter.attach(view);
          jest.clearAllMocks();
        });

        test('activates all todos', () => {
          presenter.completeAll();

          expect(todosState.state[0].isCompleted).toBe(false);
        });
      });
    });
  });
});
