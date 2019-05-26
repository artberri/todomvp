import { bootstrap } from '../../../src/bootstrap';
import { Injector } from '../../../src/framework';
import { TodoPresenter } from '../../../src/presenters';
import { Todo, FilterState, AppState, TodosState } from '../../../src/model';
import { ITodoView } from '../../../src/views';

import * as todoViewMock from '../../mocks/views/todo-view.mock';
import * as storageMock from '../../mocks/infrastructure/storage.mock';

describe('TodoPresenter', () => {
  let presenter: TodoPresenter;
  let filterState: FilterState;
  let todosState: TodosState;
  let view: ITodoView;
  let activeTodo: Todo;
  let activeTodo2: Todo;
  let completedTodo: Todo;

  beforeEach(() => {
    activeTodo = new Todo(1, 'Initially active todo');
    activeTodo2 = new Todo(2, 'Initially active todo 2');
    completedTodo = new Todo(3, 'Initially completed todo');
    completedTodo.complete();

    bootstrap(storageMock.TodoStorageMock);
    view = new todoViewMock.TodoViewMock();
    presenter = Injector.resolve<TodoPresenter>(TodoPresenter);
    filterState = Injector.resolve<FilterState>(FilterState);
    todosState = Injector.resolve<TodosState>(TodosState);
    todosState.initialize([activeTodo, completedTodo, activeTodo2]);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    Injector.reset();
  });

  describe('On load', () => {
    describe('when the todo is active', () => {
      beforeEach(() => {
        view.todo = activeTodo;
      });

      test('activates todo', () => {
        presenter.attach(view);

        expect(view.activateTodo).toHaveBeenCalled();
      });

      test('sets the view mode', () => {
        presenter.attach(view);

        expect(view.setViewMode).toHaveBeenCalled();
      });
    });

    describe('when the todo is completed', () => {
      beforeEach(() => {
        view.todo = completedTodo;
      });

      test('completes todo', () => {
        presenter.attach(view);

        expect(view.completeTodo).toHaveBeenCalled();
      });

      test('sets the view mode', () => {
        presenter.attach(view);

        expect(view.setViewMode).toHaveBeenCalled();
      });
    });
  });

  describe('On state change', () => {
    describe('when the todo is active', () => {
      beforeEach(() => {
        view.todo = activeTodo;
        presenter.attach(view);
        jest.clearAllMocks();
      });

      test('activates todo', () => {
        filterState.setVisibilityFilter('none');

        expect(view.activateTodo).toHaveBeenCalled();
      });
    });

    describe('when the todo is completed', () => {
      beforeEach(() => {
        view.todo = completedTodo;
        presenter.attach(view);
        jest.clearAllMocks();
      });

      test('completes todo', () => {
        filterState.setVisibilityFilter('none');

        expect(view.completeTodo).toHaveBeenCalled();
      });
    });
  });

  describe('User actions', () => {
    let appState: AppState;

    describe('On double click', () => {
      beforeEach(() => {
        view.todo = activeTodo;
        presenter.attach(view);
        appState = Injector.resolve<AppState>(AppState);
        jest.clearAllMocks();
      });

      test('sets edit mode', () => {
        presenter.setEditMode();

        expect(todoViewMock.setEditMode).toHaveBeenCalled();
      });
    });

    describe('On toggle checkbox clicked', () => {
      describe('when it is initially active', () => {
        beforeEach(() => {
          view.todo = activeTodo;
          presenter.attach(view);
          appState = Injector.resolve<AppState>(AppState);
          jest.clearAllMocks();
        });

        test('completes the todo', () => {
          presenter.toggleTodo();

          expect(appState.todos[0].isCompleted).toBe(true);
        });

        test('checks the checkbox', () => {
          presenter.toggleTodo();

          expect(view.completeTodo).toHaveBeenCalled();
        });
      });

      describe('when it is initially completed', () => {
        beforeEach(() => {
          view.todo = completedTodo;
          presenter.attach(view);
          appState = Injector.resolve<AppState>(AppState);
          jest.clearAllMocks();
        });

        test('activates the todo', () => {
          presenter.toggleTodo();

          expect(appState.todos[1].isCompleted).toBe(false);
        });

        test('unchecks the checkbox', () => {
          presenter.toggleTodo();

          expect(view.activateTodo).toHaveBeenCalled();
        });
      });
    });

    describe('On remove button clicked', () => {
      beforeEach(() => {
        view.todo = activeTodo;
        presenter.attach(view);
        appState = Injector.resolve<AppState>(AppState);
        jest.clearAllMocks();
      });

      test('removes the todo', () => {
        presenter.removeTodo();

        expect(appState.todos).toStrictEqual([completedTodo, activeTodo2]);
      });
    });

    describe('On input blur', () => {
      beforeEach(() => {
        view.todo = activeTodo;
        presenter.attach(view);
        appState = Injector.resolve<AppState>(AppState);
        jest.clearAllMocks();
      });

      test('edits the todo title', () => {
        const newTodoTitle = 'edited';
        view.todo = activeTodo;

        presenter.editTodo(newTodoTitle);

        expect(appState.todos[0].title).toBe(newTodoTitle);
      });
    });
  });
});
