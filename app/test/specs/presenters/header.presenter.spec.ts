import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { HeaderPresenter } from '../../../src/presenters';
import { IHeaderView } from '../../../src/views';
import { TodosState } from '../../../src/model';

import * as headerViewMock from '../../mocks/views/header-view.mock';
import * as storageMock from '../../mocks/infrastructure/storage.mock';

describe('HeaderPresenter', () => {
  let presenter: HeaderPresenter;
  let view: IHeaderView;

  beforeEach(() => {
    storageMock.getTodos.mockReturnValue([]);
    bootstrap(storageMock.TodoStorageMock);
    view = new headerViewMock.HeaderViewMock();
    presenter = Injector.resolve<HeaderPresenter>(HeaderPresenter);
  });

  afterEach(() => {
    jest.clearAllMocks();
    Injector.reset();
  });

  describe('On load', () => {
    test('empties the input', () => {
      presenter.attach(view);

      expect(view.emptyTodoInput).toHaveBeenCalled();
    });
  });

  describe('User actions', () => {
    let todosState: TodosState;

    beforeEach(() => {
      presenter.attach(view);
      todosState = Injector.resolve<TodosState>(TodosState);
      todosState.initialize([]);
    });

    describe('On add todo title', () => {
      describe('when title is not empty', () => {
        test('adds new todo to state', () => {
          const newTodoTitle = 'newTodoTitle';

          presenter.addTodo(newTodoTitle);

          expect(todosState.state[0].title).toBe(newTodoTitle);
        });

        test('empties the input', () => {
          const newTodoTitle = 'newTodoTitle';

          presenter.addTodo(newTodoTitle);

          expect(view.emptyTodoInput).toHaveBeenCalled();
          expect(todosState.state[0].title).toBe(newTodoTitle);
        });
      });

      describe('when title is empty', () => {
        test('does not add new todo to state', () => {
          const newTodoTitle = '';

          presenter.addTodo(newTodoTitle);

          expect(todosState.state.length).toBe(0);
        });
      });
    });
  });
});
