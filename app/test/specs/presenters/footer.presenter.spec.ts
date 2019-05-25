import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { FooterPresenter } from '../../../src/presenters';
import { Todo, TodosState } from '../../../src/model';
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
      activeTodo = new Todo('Initially active todo');
      activeTodo2 = new Todo('Initially active todo2');
      completedTodo = new Todo('Initially completed todo');
      completedTodo.complete();

      bootstrap(storageMock.TodoStorageMock);
      view = new footerViewMock.FooterViewMock();
      presenter = Injector.resolve<FooterPresenter>(FooterPresenter);
      todosState = Injector.resolve<TodosState>(TodosState);
      todosState.initialize([activeTodo, completedTodo, activeTodo2]);
    });

    test('sets the active todo count', () => {
      presenter.attach(view);

      expect(view.setActiveTodoCount).toHaveBeenCalledWith(2);
    });
  });

  describe('On state change', () => {
    beforeEach(() => {
      activeTodo = new Todo('Initially active todo');
      activeTodo2 = new Todo('Initially active todo2');
      completedTodo = new Todo('Initially completed todo');
      completedTodo.complete();

      bootstrap(storageMock.TodoStorageMock);
      view = new footerViewMock.FooterViewMock();
      presenter = Injector.resolve<FooterPresenter>(FooterPresenter);
      todosState = Injector.resolve<TodosState>(TodosState);
      todosState.initialize([activeTodo, completedTodo, activeTodo2]);
      presenter.attach(view);
      jest.clearAllMocks();
    });

    test('sets the active todo count', () => {
      todosState.add(new Todo('new'));

      expect(view.setActiveTodoCount).toHaveBeenCalledWith(3);
    });
  });
});
