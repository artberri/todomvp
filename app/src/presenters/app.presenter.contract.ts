export interface IAppPresenter {
  showAllTodos(): void;
  showActiveTodos(): void;
  showCompletedTodos(): void;
  addTodo(newTodoTitle: string): void;
}
