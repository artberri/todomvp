import { StorageMock, seedTodos, activeTodo, completedTodo } from '../../mocks';
import { bootstrap, TodoPresenter } from '../../../src';

let presenter: TodoPresenter;

beforeEach(() => {
  const mediator = bootstrap(StorageMock);
  presenter = new TodoPresenter(mediator);
});

describe('TodoPresenter', () => {
  describe('onLoad', () => {
    test('presents all todos', () => {
      presenter.onLoad();
      expect(presenter.todos).toBe(seedTodos);
    });
  });

  describe('onClickAllButton', () => {
    test('presents all todos', () => {
      presenter.onClickAllButton();
      expect(presenter.todos).toBe(seedTodos);
    });
  });

  describe('onClickActiveButton', () => {
    test('presents active todos', () => {
      presenter.onClickActiveButton();
      expect(presenter.todos.length).toBe(1);
      expect(presenter.todos[0]).toBe(activeTodo);
    });
  });

  describe('onClickCompletedButton', () => {
    test('presents completed todos', () => {
      presenter.onClickCompletedButton();
      expect(presenter.todos.length).toBe(1);
      expect(presenter.todos[0]).toBe(completedTodo);
    });
  });
});
